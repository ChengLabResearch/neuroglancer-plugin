// @ts-nocheck
// Templates return ready-to-download Python scripts with settings inlined.

function pyList(values: (number | string)[]): string {
  return `[${values.map((value) => String(value)).join(', ')}]`;
}

function pyQuote(value: string): string {
  return JSON.stringify(value ?? '');
}

function pyBool(value: boolean): string {
  return value ? 'True' : 'False';
}

export function scriptByLabelMeshBBox(opts: {
  cloudpathImg: string;
  cloudpathSeg: string;
  segIds: (number | string)[];
  segLabel: string;
  readMipImg: number;
  readMipSeg: number;
  marginVoxSeg: [number, number, number];
  saveImage: boolean;
  saveSeg: boolean;
  saveMask: boolean;
  saveMaskPerSlice: boolean;
  maskAs1Bit: boolean;
  saveCsv: boolean;
  csvMaxRows: number | null;
  segZeroNonSelected: boolean;
  segArrayDtype: 'uint16' | 'uint32' | 'source';
  transposeXY: boolean;
  compression: 'none' | 'zlib' | 'lzw' | 'zstd' | 'packbits';
  predictor2: boolean;
  memoryBudgetGB: number;
}): string {
  const ids = opts.segIds.map((id) => (typeof id === 'number' ? id : JSON.stringify(String(id))));
  const comp = opts.compression === 'none' ? 'None' : `'${opts.compression}'`;
  const predictor = opts.predictor2 ? '2' : 'None';
  const csvCap = opts.csvMaxRows === null || typeof opts.csvMaxRows === 'undefined' ? 'None' : String(opts.csvMaxRows);
  const dtype = opts.segArrayDtype;
  const hasImagePath = !!(opts.cloudpathImg && opts.cloudpathImg.trim());
  const csvIncludeImage = opts.saveCsv && hasImagePath;
  const maskStack = opts.saveMask && !opts.saveMaskPerSlice;
  const maskPerSlice = opts.saveMask && opts.saveMaskPerSlice;
  return `# --- Octopus Atlas: download_by_label_mesh_bbox.py ---
# Auto-generated from the viewer overlay. Modify as needed before running.
from pathlib import Path
from datetime import datetime
import csv
import numpy as np
from cloudvolume import CloudVolume, Bbox
from tifffile import TiffWriter, imwrite

CLOUDPATH_IMG = ${pyQuote(opts.cloudpathImg)}
CLOUDPATH_SEG = ${pyQuote(opts.cloudpathSeg)}
SEGMENT_IDS   = ${pyList(ids)}
SEGMENT_LABEL = ${pyQuote(opts.segLabel)}

READ_MIP_IMG  = ${opts.readMipImg}
READ_MIP_SEG  = ${opts.readMipSeg}
MARGIN_VOX_SEG = (${opts.marginVoxSeg[0]}, ${opts.marginVoxSeg[1]}, ${opts.marginVoxSeg[2]})

SAVE_IMAGE_ARRAY = ${pyBool(opts.saveImage)}
SAVE_SEG_ARRAY   = ${pyBool(opts.saveSeg)}
SAVE_MASK_TIFF   = ${pyBool(opts.saveMask)}
SAVE_MASK_STACK  = ${pyBool(maskStack)}
SAVE_MASK_PER_SLICE = ${pyBool(maskPerSlice)}
SAVE_MASK_CSV    = ${pyBool(opts.saveCsv)}
CSV_MAX_ROWS     = ${csvCap}
CSV_INCLUDE_IMAGE_VALUE = ${pyBool(csvIncludeImage)}

SEG_ZERO_OUT_NONSELECTED = ${pyBool(opts.segZeroNonSelected)}
SEG_ARRAY_DTYPE          = ${pyQuote(dtype)}

MASK_BIT_DEPTH           = ${pyQuote(opts.maskAs1Bit ? '1bit' : 'u8')}
TRANSPOSE_XY_FOR_TIFF    = ${pyBool(opts.transposeXY)}

TIFF_COMPRESSION         = ${comp}
TIFF_COMPRESSIONARGS     = {}
TIFF_PREDICTOR           = ${predictor}

PROGRESS = True
CACHE    = False
MEMORY_BUDGET_GB = ${opts.memoryBudgetGB}

` + PY_CORE_MESH_TO_BBOX;
}

export function scriptWholeImageDump(opts: {
  cloudpathImg: string;
  readMipImg: number;
  castDtype: 'uint16' | 'source';
  saveStack: boolean;
  transposeXY: boolean;
  compression: 'none' | 'zlib' | 'lzw' | 'zstd' | 'packbits';
  predictor2: boolean;
  memoryBudgetGB: number;
}): string {
  const comp = opts.compression === 'none' ? 'None' : `'${opts.compression}'`;
  const pred = opts.predictor2 ? '2' : 'None';
  const cast = opts.castDtype === 'uint16' ? 'np.uint16' : 'None';
  return `# --- Octopus Atlas: download_whole_image_volume.py ---
# Pull the entire image volume at the chosen MIP. Writes BigTIFF or per-slice TIFFs with chunked Z streaming.
# Requirements: pip install cloud-volume numpy tifffile (and imagecodecs for compression)

from pathlib import Path
from datetime import datetime
import numpy as np
from cloudvolume import CloudVolume
from tifffile import TiffWriter, imwrite

CLOUDPATH_IMG    = ${pyQuote(opts.cloudpathImg)}
READ_MIP_IMG     = ${opts.readMipImg}
CAST_TO_DTYPE    = ${cast}   # None or numpy dtype (e.g., np.uint16)
SAVE_AS_STACK    = ${pyBool(opts.saveStack)}  # True=BigTIFF; False=per-slice
TRANSPOSE_XY     = ${pyBool(opts.transposeXY)}
TIFF_COMPRESSION = ${comp}
TIFF_COMPRESSIONARGS = {}
TIFF_PREDICTOR   = ${pred}
PROGRESS = True
CACHE    = False
MEMORY_BUDGET_GB = ${opts.memoryBudgetGB}

` + PY_CORE_WHOLE_IMAGE;
}

const PY_CORE_MESH_TO_BBOX = String.raw`
# --- Helper utilities -----------------------------------------------------

def slug(s):
    import re
    return re.sub(r'[^A-Za-z0-9._-]+', '_', (s or 'segment')).strip('_')


def scale_params(vol):
    sc = vol.scale
    res_nm = np.array(sc["resolution"], dtype=np.float64)
    off_vx = np.array(sc.get("voxel_offset", (0, 0, 0)), dtype=np.int64)
    size = np.array(sc["size"], dtype=np.int64)
    return res_nm, off_vx, size


def fused_vertices_nm(seg_vol, segids):
    meshes = seg_vol.mesh.get(segids)
    if isinstance(meshes, dict):
        verts = []
        for sid in segids:
            entry = meshes.get(sid)
            if entry is None:
                continue
            verts.append(np.asarray(entry.vertices))
        if not verts:
            return np.empty((0, 3), dtype=np.float64)
        return np.vstack(verts).astype(np.float64, copy=False)
    return np.asarray(meshes.vertices, dtype=np.float64)


def clip_bbox_to_bounds(bbox, bounds):
    lo = np.maximum(np.array(bbox.minpt), np.array(bounds.minpt))
    hi = np.minimum(np.array(bbox.maxpt), np.array(bounds.maxpt))
    hi = np.maximum(hi, lo + 1)
    return Bbox(lo.astype(np.int64), hi.astype(np.int64))


def orient(page):
    page = np.ascontiguousarray(page)
    return page.T if TRANSPOSE_XY_FOR_TIFF else page


def predictor_for(dtype):
    if TIFF_PREDICTOR in (None, 1):
        return TIFF_PREDICTOR
    kind = np.dtype(dtype).kind
    if kind in ('u', 'i'):
        return 2
    if kind == 'f' and TIFF_PREDICTOR == 3:
        return 3
    return None


def write_with_fallback(writer, page, *, photometric=None, dtype=None):
    comp = TIFF_COMPRESSION
    cargs = TIFF_COMPRESSIONARGS or None
    pred = predictor_for(dtype if dtype is not None else page.dtype)
    data = orient(page)
    # Bilevel guard
    if data.dtype == np.bool_ and comp not in (None, 'packbits'):
        try:
            writer.write(data, photometric=photometric, compression=comp, compressionargs=cargs)
            return
        except TypeError:
            pass
        except Exception:
            pass
        try:
            writer.write(data, photometric=photometric, compression='packbits')
            return
        except Exception:
            writer.write(data, photometric=photometric)
            return
    try:
        writer.write(data, photometric=photometric, compression=comp, compressionargs=cargs, predictor=pred)
        return
    except TypeError:
        try:
            writer.write(data, photometric=photometric, compression=comp, predictor=pred)
            return
        except TypeError:
            writer.write(data, photometric=photometric, compression=comp)
            return


def imwrite_with_fallback(path, page, *, photometric=None, dtype=None):
    comp = TIFF_COMPRESSION
    cargs = TIFF_COMPRESSIONARGS or None
    pred = predictor_for(dtype if dtype is not None else page.dtype)
    data = orient(page)
    if data.dtype == np.bool_ and comp not in (None, 'packbits'):
        try:
            imwrite(path, data, photometric=photometric, compression=comp, compressionargs=cargs)
            return
        except TypeError:
            pass
        except Exception:
            pass
        try:
            imwrite(path, data, photometric=photometric, compression='packbits')
            return
        except Exception:
            imwrite(path, data, photometric=photometric)
            return
    try:
        imwrite(path, data, photometric=photometric, compression=comp, compressionargs=cargs, predictor=pred)
        return
    except TypeError:
        try:
            imwrite(path, data, photometric=photometric, compression=comp, predictor=pred)
            return
        except TypeError:
            imwrite(path, data, photometric=photometric, compression=comp)
            return


# --- Open CloudVolume handles ------------------------------------------------

need_image = SAVE_IMAGE_ARRAY or (SAVE_MASK_CSV and CSV_INCLUDE_IMAGE_VALUE)
imgV = None
img_res = img_off = img_size = None
if need_image or (CLOUDPATH_IMG and str(CLOUDPATH_IMG).strip()):
    if not CLOUDPATH_IMG or not str(CLOUDPATH_IMG).strip():
        if need_image:
            raise RuntimeError('Image cloudpath required for requested outputs, but none provided.')
    else:
        imgV = CloudVolume(CLOUDPATH_IMG, mip=READ_MIP_IMG, cache=CACHE, progress=PROGRESS if need_image else False)
        img_res, img_off, img_size = scale_params(imgV)

if need_image and imgV is None:
    raise RuntimeError('Unable to open image volume for requested outputs.')

segV = CloudVolume(CLOUDPATH_SEG, mip=READ_MIP_SEG, cache=CACHE, progress=PROGRESS)
seg_res, seg_off, seg_size = scale_params(segV)

verts_nm = fused_vertices_nm(segV, SEGMENT_IDS)
if verts_nm.size == 0:
    raise RuntimeError('Mesh has no vertices for the requested segment IDs.')

margin = np.array(MARGIN_VOX_SEG, dtype=np.int64)

bb_min_nm = verts_nm.min(axis=0)
bb_max_nm = verts_nm.max(axis=0)

bb_min_vx_global = np.floor(bb_min_nm / seg_res).astype(np.int64)
bb_max_vx_global = np.ceil(bb_max_nm / seg_res).astype(np.int64) + 1
bb_min_idx = bb_min_vx_global - seg_off - margin
bb_max_idx = bb_max_vx_global - seg_off + margin
bbox_seg = clip_bbox_to_bounds(Bbox(bb_min_idx, bb_max_idx), segV.bounds)

bbox_img = None
if imgV is not None and img_res is not None:
    bb_min_vx_img_glob = np.floor(bb_min_nm / img_res).astype(np.int64)
    bb_max_vx_img_glob = np.ceil(bb_max_nm / img_res).astype(np.int64) + 1
    bb_min_idx_img = bb_min_vx_img_glob - img_off - margin
    bb_max_idx_img = bb_max_vx_img_glob - img_off + margin
    bbox_img = clip_bbox_to_bounds(Bbox(bb_min_idx_img, bb_max_idx_img), imgV.bounds)
else:
    CSV_INCLUDE_IMAGE_VALUE = False

if CSV_INCLUDE_IMAGE_VALUE and bbox_img is None:
    print('[warn] CSV include image requested but image bbox unavailable; disabling column.')
    CSV_INCLUDE_IMAGE_VALUE = False

# --- Output directories ------------------------------------------------------

script_dir = Path(__file__).resolve().parent
x0g, y0g, z0g = map(int, (np.array(bbox_seg.minpt) + seg_off))
ids = '-'.join(map(str, SEGMENT_IDS))
ts = datetime.now().strftime('%Y%m%d_%H%M%S')
run = f"{ts}_{slug(SEGMENT_LABEL)}_ids{ids}_mip{READ_MIP_SEG}_x{x0g}_y{y0g}"
outdir = script_dir / run
outdir.mkdir(parents=True, exist_ok=True)
mask_slices_dir = outdir / 'mask_slices'

# --- Chunk plan -------------------------------------------------------------

sx, sy, sz = bbox_seg.to_slices()
ix = iy = iz = None
if bbox_img is not None:
    ix, iy, iz = bbox_img.to_slices()

X = sx.stop - sx.start
Y = sy.stop - sy.start
Z = sz.stop - sz.start

seg_sample = segV[sx.start:sx.start + 1, sy.start:sy.start + 1, sz.start:sz.start + 1]
seg_dtype = seg_sample.dtype
needs_seg = SAVE_SEG_ARRAY or SAVE_MASK_TIFF or SAVE_MASK_CSV

img_dtype = None
if imgV is not None and (SAVE_IMAGE_ARRAY or (SAVE_MASK_CSV and CSV_INCLUDE_IMAGE_VALUE)):
    img_sample = imgV[ix.start:ix.start + 1, iy.start:iy.start + 1, iz.start:iz.start + 1]
    img_dtype = img_sample.dtype

mask_bpv = 1 if (SAVE_MASK_TIFF or SAVE_MASK_CSV) else 0
seg_bpv = np.dtype(seg_dtype).itemsize if needs_seg else 0
img_bpv = np.dtype(img_dtype).itemsize if img_dtype is not None else 0
per_z_bytes = X * Y * (seg_bpv + img_bpv + mask_bpv)
if per_z_bytes == 0:
    raise RuntimeError('Nothing to do: all outputs are disabled.')

budget_bytes = int(MEMORY_BUDGET_GB * (1024 ** 3))
chunk_z = max(1, min(Z, budget_bytes // max(1, per_z_bytes)))

print(f"[Plan] outdir={outdir}")
print(f"[Plan] X={X} Y={Y} Z={Z}  seg_dtype={seg_dtype}  img_dtype={img_dtype}  per_z≈{per_z_bytes / 1e6:.1f}MB  chunk_z={chunk_z}  budget≈{MEMORY_BUDGET_GB}GB")

mask_stack_writer = None
img_stack_writer = None
seg_stack_writer = None

if SAVE_MASK_TIFF and SAVE_MASK_STACK:
    z0 = int(bbox_seg.minpt[2] + seg_off[2])
    z1 = int(bbox_seg.maxpt[2] + seg_off[2]) - 1
    mask_stack_path = outdir / f"mask_stack_ids{ids}_z{z0}-{z1}_mip{READ_MIP_SEG}.tif"
    mask_stack_writer = TiffWriter(str(mask_stack_path), bigtiff=True)

if SAVE_IMAGE_ARRAY and imgV is not None and bbox_img is not None:
    z0 = int(bbox_img.minpt[2] + img_off[2])
    z1 = int(bbox_img.maxpt[2] + img_off[2]) - 1
    img_stack_path = outdir / f"image_stack_z{z0}-{z1}_mip{READ_MIP_IMG}.tif"
    img_stack_writer = TiffWriter(str(img_stack_path), bigtiff=True)

if SAVE_SEG_ARRAY:
    z0 = int(bbox_seg.minpt[2] + seg_off[2])
    z1 = int(bbox_seg.maxpt[2] + seg_off[2]) - 1
    seg_stack_path = outdir / f"seg_stack_ids{ids}_z{z0}-{z1}_mip{READ_MIP_SEG}_{SEG_ARRAY_DTYPE}.tif"
    seg_stack_writer = TiffWriter(str(seg_stack_path), bigtiff=True)

csv_rows_written = 0
if SAVE_MASK_CSV:
    csv_file = open(outdir / f"voxels_xyz_{slug(SEGMENT_LABEL)}_ids{ids}.csv", 'w', newline='')
    csv_writer = csv.writer(csv_file)
    if CSV_INCLUDE_IMAGE_VALUE:
        csv_writer.writerow(['x_global', 'y_global', 'z_global', 'image_value'])
    else:
        csv_writer.writerow(['x_global', 'y_global', 'z_global'])
else:
    csv_file = csv_writer = None

z_done = 0
ids_arr = np.array(SEGMENT_IDS)

while z_done < Z:
    z_len = min(chunk_z, Z - z_done)
    seg_chunk = None
    img_chunk = None

    if needs_seg:
        seg_chunk = segV[sx, sy, slice(sz.start + z_done, sz.start + z_done + z_len)]
    if imgV is not None and bbox_img is not None and (SAVE_IMAGE_ARRAY or (SAVE_MASK_CSV and CSV_INCLUDE_IMAGE_VALUE)):
        img_chunk = imgV[ix, iy, slice(iz.start + z_done, iz.start + z_done + z_len)]
        if img_chunk.ndim == 4 and img_chunk.shape[-1] > 1:
            img_chunk = img_chunk[..., 0]

    if SAVE_MASK_TIFF or SAVE_MASK_CSV:
        mask_bool = np.isin(seg_chunk, ids_arr)
        if SAVE_MASK_TIFF:
            if MASK_BIT_DEPTH.lower() == '1bit':
                if SAVE_MASK_STACK:
                    for k in range(mask_bool.shape[2]):
                        write_with_fallback(mask_stack_writer, mask_bool[:, :, k], photometric='minisblack')
                else:
                    mask_slices_dir.mkdir(exist_ok=True)
                    for k in range(mask_bool.shape[2]):
                        zg = int(bbox_seg.minpt[2] + seg_off[2] + z_done + k)
                        imwrite_with_fallback(mask_slices_dir / f"mask_ids{ids}_z{zg:06d}_mip{READ_MIP_SEG}.tif", mask_bool[:, :, k], photometric='minisblack')
            else:
                mask_u8 = (mask_bool.astype(np.uint8) * 255)
                if SAVE_MASK_STACK:
                    for k in range(mask_u8.shape[2]):
                        write_with_fallback(mask_stack_writer, mask_u8[:, :, k], photometric='minisblack', dtype=np.uint8)
                else:
                    mask_slices_dir.mkdir(exist_ok=True)
                    for k in range(mask_u8.shape[2]):
                        zg = int(bbox_seg.minpt[2] + seg_off[2] + z_done + k)
                        imwrite_with_fallback(mask_slices_dir / f"mask_ids{ids}_z{zg:06d}_mip{READ_MIP_SEG}.tif", mask_u8[:, :, k], photometric='minisblack', dtype=np.uint8)

        if SAVE_MASK_CSV:
            nz = np.nonzero(mask_bool)
            if nz[0].size:
                xg = nz[0] + (bbox_seg.minpt[0] + seg_off[0])
                yg = nz[1] + (bbox_seg.minpt[1] + seg_off[1])
                zg = nz[2] + (bbox_seg.minpt[2] + seg_off[2]) + z_done

                if CSV_INCLUDE_IMAGE_VALUE and img_chunk is not None:
                    xi_glob = np.floor((xg * seg_res[0]) / img_res[0]).astype(np.int64)
                    yi_glob = np.floor((yg * seg_res[1]) / img_res[1]).astype(np.int64)
                    zi_glob = np.floor((zg * seg_res[2]) / img_res[2]).astype(np.int64)

                    xi_loc_bbox = xi_glob - (img_off[0] + bbox_img.minpt[0])
                    yi_loc_bbox = yi_glob - (img_off[1] + bbox_img.minpt[1])
                    zi_loc_bbox = zi_glob - (img_off[2] + bbox_img.minpt[2])
                    zi_loc_chunk = zi_loc_bbox - z_done

                    Xi, Yi, Zi = img_chunk.shape[0], img_chunk.shape[1], img_chunk.shape[2]
                    valid = (
                        (xi_loc_bbox >= 0) & (xi_loc_bbox < Xi) &
                        (yi_loc_bbox >= 0) & (yi_loc_bbox < Yi) &
                        (zi_loc_chunk >= 0) & (zi_loc_chunk < Zi)
                    )

                    vals = np.full(xg.shape, np.nan, dtype=np.float64)
                    if np.any(valid):
                        xv = np.asarray(xi_loc_bbox[valid], dtype=np.int64).ravel()
                        yv = np.asarray(yi_loc_bbox[valid], dtype=np.int64).ravel()
                        zv = np.asarray(zi_loc_chunk[valid], dtype=np.int64).ravel()
                        lin = np.ravel_multi_index((xv, yv, zv), (Xi, Yi, Zi), mode='raise')
                        gathered = np.asarray(img_chunk, order='C').reshape(-1)[lin]
                        vals[valid] = gathered.astype(np.float64, copy=False)

                    if CSV_MAX_ROWS is not None and csv_rows_written + xg.size > CSV_MAX_ROWS:
                        take = CSV_MAX_ROWS - csv_rows_written
                        for row in zip(xg[:take], yg[:take], zg[:take], vals[:take]):
                            csv_writer.writerow(row)
                        csv_rows_written += take
                        print(f"[CSV] Wrote {csv_rows_written} rows (hit cap.)")
                        SAVE_MASK_CSV = False
                    else:
                        for row in zip(xg, yg, zg, vals):
                            csv_writer.writerow(row)
                        csv_rows_written += xg.size
                else:
                    if CSV_MAX_ROWS is not None and csv_rows_written + xg.size > CSV_MAX_ROWS:
                        take = CSV_MAX_ROWS - csv_rows_written
                        for row in zip(xg[:take], yg[:take], zg[:take]):
                            csv_writer.writerow(row)
                        csv_rows_written += take
                        print(f"[CSV] Wrote {csv_rows_written} rows (hit cap.)")
                        SAVE_MASK_CSV = False
                    else:
                        for row in zip(xg, yg, zg):
                            csv_writer.writerow(row)
                        csv_rows_written += xg.size

    if SAVE_IMAGE_ARRAY and img_chunk is not None:
        for k in range(img_chunk.shape[2]):
            write_with_fallback(img_stack_writer, img_chunk[:, :, k])

    if SAVE_SEG_ARRAY and seg_chunk is not None:
        for k in range(seg_chunk.shape[2]):
            page = seg_chunk[:, :, k]
            if SEG_ZERO_OUT_NONSELECTED:
                page = np.where(np.isin(page, ids_arr), page, 0)
            if SEG_ARRAY_DTYPE == 'uint16':
                page = page.astype(np.uint16, copy=False)
            elif SEG_ARRAY_DTYPE == 'uint32':
                page = page.astype(np.uint32, copy=False)
            elif SEG_ARRAY_DTYPE != 'source':
                raise ValueError("SEG_ARRAY_DTYPE must be 'uint16', 'uint32', or 'source'.")
            write_with_fallback(seg_stack_writer, page, dtype=page.dtype)

    z_done += z_len
    print(f"[Chunk] processed z {z_done}/{Z}")

if mask_stack_writer:
    mask_stack_writer.close()
if img_stack_writer:
    img_stack_writer.close()
if seg_stack_writer:
    seg_stack_writer.close()
if csv_writer:
    csv_file.close()

# --- Debug -----------------------------------------------------------------

def bbox_tuple(b):
    if b is None:
        return None
    return (tuple(map(int, b.minpt)), tuple(map(int, b.maxpt)))

print('\n==== DEBUG ====')
print('SEG MIP', READ_MIP_SEG, 'res_nm:', seg_res, 'voxel_offset:', seg_off, 'bounds:', bbox_tuple(segV.bounds))
if imgV is not None:
    print('IMG MIP', READ_MIP_IMG, 'res_nm:', img_res, 'voxel_offset:', img_off, 'bounds:', bbox_tuple(imgV.bounds))
else:
    print('IMG MIP', READ_MIP_IMG, 'res_nm: (n/a) voxel_offset: (n/a) bounds: (n/a)')
print('Mesh bbox (nm):  min', bb_min_nm, 'max', bb_max_nm)
print('Seg bbox (idx):', bbox_tuple(bbox_seg))
print('Img bbox (idx):', bbox_tuple(bbox_img))
print('CSV include image:', CSV_INCLUDE_IMAGE_VALUE)
print('Output dir:', outdir.resolve())
print('CSV rows:', csv_rows_written)
`;

const PY_CORE_WHOLE_IMAGE = String.raw`
from datetime import datetime
import re

def slug(s): 
    import re
    return re.sub(r'[^A-Za-z0-9._-]+','_', (s or 'image')).strip('_')

def orient(page2d):
    import numpy as np
    page2d = np.ascontiguousarray(page2d)
    return page2d.T if TRANSPOSE_XY else page2d

def predictor_for(dtype):
    import numpy as np
    if TIFF_PREDICTOR in (None, 1): return TIFF_PREDICTOR
    kind = np.dtype(dtype).kind
    if kind in ('u','i'): return 2
    if kind == 'f' and TIFF_PREDICTOR == 3: return 3
    return None

def write_with_fallback(writer, page, *, dtype=None):
    comp  = TIFF_COMPRESSION
    cargs = TIFF_COMPRESSIONARGS or None
    pred  = predictor_for(dtype if dtype is not None else page.dtype)
    data  = orient(page)
    try:
        writer.write(data, compression=comp, compressionargs=cargs, predictor=pred)
        return
    except TypeError:
        try:
            writer.write(data, compression=comp, predictor=pred); return
        except TypeError:
            writer.write(data, compression=comp); return

def imwrite_with_fallback(path, page, *, dtype=None):
    comp  = TIFF_COMPRESSION
    cargs = TIFF_COMPRESSIONARGS or None
    pred  = predictor_for(dtype if dtype is not None else page.dtype)
    data  = orient(page)
    from tifffile import imwrite
    try:
        imwrite(path, data, compression=comp, compressionargs=cargs, predictor=pred); return
    except TypeError:
        try:
            imwrite(path, data, compression=comp, predictor=pred); return
        except TypeError:
            imwrite(path, data, compression=comp); return

imgV = CloudVolume(CLOUDPATH_IMG, mip=READ_MIP_IMG, cache=CACHE, progress=PROGRESS)
res_nm = imgV.scale['resolution']
off_vx = imgV.scale.get('voxel_offset', (0,0,0))
size   = imgV.scale['size']

from cloudvolume import Bbox
bbox = imgV.bounds  # ((minX,minY,minZ),(maxX,maxY,maxZ)) at this MIP

sx, sy, sz = bbox.to_slices()
X, Y, Z = (sx.stop - sx.start), (sy.stop - sy.start), (sz.stop - sz.start)

# Estimate memory per Z
import numpy as np, math
sample = imgV[sx.start:sx.start+1, sy.start:sy.start+1, sz.start:sz.start+1]
dtype  = sample.dtype
bpv    = np.dtype(dtype).itemsize
per_z  = X * Y * bpv
budget = int(MEMORY_BUDGET_GB * (1024**3))
chunk_z = max(1, min(Z, budget // max(1, per_z)))

ts = datetime.now().strftime('%Y%m%d_%H%M%S')
script_dir = Path(__file__).resolve().parent
outdir = script_dir / f"{ts}_whole_image_mip{READ_MIP_IMG}"
outdir.mkdir(parents=True, exist_ok=True)
slices_dir = outdir / 'image_slices'

# Stack writer if requested
stack_writer = None
if SAVE_AS_STACK:
    z0 = int(bbox.minpt[2]); z1 = int(bbox.maxpt[2]-1)
    stack_path = outdir / f'image_stack_z{z0}-{z1}_mip{READ_MIP_IMG}.tif'
    from tifffile import TiffWriter
    stack_writer = TiffWriter(str(stack_path), bigtiff=True)

z_done=0
while z_done < Z:
    z_len = min(chunk_z, Z - z_done)
    chunk = imgV[sx, sy, slice(sz.start + z_done, sz.start + z_done + z_len)]
    if chunk.ndim == 4 and chunk.shape[-1] > 1:
        chunk = chunk[...,0]
    if CAST_TO_DTYPE is not None:
        chunk = chunk.astype(CAST_TO_DTYPE, copy=False)

    for k in range(chunk.shape[2]):
        page = chunk[:,:,k]
        if SAVE_AS_STACK:
            write_with_fallback(stack_writer, page, dtype=page.dtype)
        else:
            slices_dir.mkdir(exist_ok=True)
            zg = int(bbox.minpt[2] + z_done + k)
            imwrite_with_fallback(slices_dir / f'image_z{zg:06d}_mip{READ_MIP_IMG}.tif', page, dtype=page.dtype)

    z_done += z_len
    print(f"[Chunk] processed z {z_done}/{Z}")

if stack_writer: stack_writer.close()

print("\n==== DEBUG ====")
print("IMG MIP", READ_MIP_IMG, "res_nm:", res_nm, "voxel_offset:", off_vx, "bounds:", ((int(bbox.minpt[0]),int(bbox.minpt[1]),int(bbox.minpt[2])),(int(bbox.maxpt[0]),int(bbox.maxpt[1]),int(bbox.maxpt[2]))))
print("Output dir:", outdir.resolve())
`;
