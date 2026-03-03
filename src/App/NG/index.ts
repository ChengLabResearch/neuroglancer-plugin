import './Styles/shell.css';
import { bootApp } from './Viewer/boot';

async function main(): Promise<void> {
  if (typeof window !== 'undefined') {
    window.__atlasExportDefaults = {
      imageLayerName: 'Octopus image',
      segmentationLayerName: 'Segmentation Labels',
      readMipImage: 1,
      readMipSeg: 1,
      marginVoxSeg: [16, 16, 8],
      saveImage: true,
      saveSeg: true,
      saveMask: false,
      maskAs1Bit: false,
      maskPerSlice: false,
      saveCsv: false,
      csvMaxRows: null,
      segZeroNonSelected: true,
      segArrayDtype: 'uint16',
      transposeXY: true,
      compression: 'zlib',
      predictor2: true,
      memoryBudgetGB: 3.0,
      wholeSaveStack: true,
      wholeCastDtype: 'source',
      ...window.__atlasExportDefaults,
    };
  }

  try {
    await bootApp();
  } catch (error) {
    console.error('[Bootstrap] Failed to initialise application:', error);
  }
}

void main();
