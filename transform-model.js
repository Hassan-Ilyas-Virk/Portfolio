import { NodeIO } from '@gltf-transform/core';
import { draco } from '@gltf-transform/functions';

async function transformModel() {
  const io = new NodeIO();
  
  // Read the model
  const document = await io.read('public/skull 2.glb');
  
  // Apply Draco compression
  await document.transform(
    draco({ compressionLevel: 7 })
  );
  
  // Write the transformed model
  await io.write('public/skull2-transformed.glb', document);
}

transformModel().catch(console.error); 