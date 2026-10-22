import * as THREE from "three";

/**
 * Customizes the 3D Character model:
 * 1. Lighter warm skin tone (Face, Ears, Neck, Hands)
 * 2. Stylish dark charcoal/black T-shirt (Body)
 * 3. Modern 3D Glasses / Specs attached to the head bone
 */
export function customizeCharacter(character: THREE.Object3D) {
  // 1. Curated Color Palette
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#dfc5b2"), // Fair, light warm wheat skin tone
    roughness: 0.52,
    metalness: 0.02,
  });

  const shirtMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#18181b"), // Sleek matte charcoal/black T-shirt
    roughness: 0.82,
    metalness: 0.08,
  });

  const pantMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#242730"), // Stylish dark navy/denim trousers
    roughness: 0.8,
    metalness: 0.05,
  });

  const shoeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ededed"), // Clean white sneaker upper
    roughness: 0.4,
    metalness: 0.05,
  });

  const soleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1a1a1a"), // Dark sneaker sole
    roughness: 0.6,
    metalness: 0.1,
  });

  // Apply materials to each mesh
  character.traverse((child: any) => {
    if (child.isMesh) {
      const mesh = child as THREE.Mesh;
      const name = mesh.name.toLowerCase();

      if (name.includes("plane007") || name === "face" || name.includes("face")) {
        // Face & Head
        mesh.material = skinMaterial;
      } else if (name.includes("plane003") || name.includes("ear")) {
        // Ears
        mesh.material = skinMaterial;
      } else if (name.includes("neck")) {
        // Neck
        mesh.material = skinMaterial;
      } else if (name.includes("hand")) {
        // Hands
        mesh.material = skinMaterial;
      } else if (name.includes("cube002") || name.includes("shirt") || name.includes("body")) {
        // T-Shirt
        mesh.material = shirtMaterial;
      } else if (name.includes("pant")) {
        // Pants
        mesh.material = pantMaterial;
      } else if (name.includes("sole")) {
        // Sneaker sole
        mesh.material = soleMaterial;
      } else if (name.includes("shoe")) {
        // Sneaker upper
        mesh.material = shoeMaterial;
      }
    }
  });

  // 2. Add Specs (Glasses) to Head Bone
  const headBone =
    character.getObjectByName("spine006") ||
    character.getObjectByName("spine.006");

  if (headBone) {
    // Remove existing accessories if any (prevent duplicates on re-render)
    const existingGlasses = headBone.getObjectByName("character-glasses");
    if (existingGlasses) headBone.remove(existingGlasses);

    // --- Build 3D Specs / Glasses ---
    const glassesGroup = createGlasses();
    headBone.add(glassesGroup);
  }
}

function createGlasses(): THREE.Group {
  const group = new THREE.Group();
  group.name = "character-glasses";

  const frameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#18181b"),
    roughness: 0.3,
    metalness: 0.3,
  });

  const lensMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#c4d5f2"),
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    transmission: 0.92,
    ior: 1.5,
    clearcoat: 1.0,
    depthWrite: false,
  });

  // Sleek modern rounded-rectangular frames (wider than tall)
  const rimGeo = new THREE.TorusGeometry(0.27, 0.024, 16, 48);

  // Left Rim & Lens
  const leftRim = new THREE.Mesh(rimGeo, frameMat);
  leftRim.scale.set(1.35, 0.90, 1.0);
  leftRim.position.set(0.44, 1.34, 1.15);
  group.add(leftRim);

  const lensGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.006, 32);
  lensGeo.rotateX(Math.PI / 2);

  const leftLens = new THREE.Mesh(lensGeo, lensMat);
  leftLens.scale.set(1.30, 0.86, 1.0);
  leftLens.position.set(0.44, 1.34, 1.155);
  group.add(leftLens);

  // Right Rim & Lens
  const rightRim = new THREE.Mesh(rimGeo, frameMat);
  rightRim.scale.set(1.35, 0.90, 1.0);
  rightRim.position.set(-0.44, 1.34, 1.15);
  group.add(rightRim);

  const rightLens = new THREE.Mesh(lensGeo, lensMat);
  rightLens.scale.set(1.30, 0.86, 1.0);
  rightLens.position.set(-0.44, 1.34, 1.155);
  group.add(rightLens);

  // Sleek Nose Bridge
  const bridgeGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.24, 16);
  bridgeGeo.rotateZ(Math.PI / 2);
  const bridge = new THREE.Mesh(bridgeGeo, frameMat);
  bridge.position.set(0, 1.38, 1.17);
  group.add(bridge);

  // Temples (arms extending back towards ears)
  const templeGeo = new THREE.CylinderGeometry(0.016, 0.012, 0.92, 12);
  templeGeo.rotateX(Math.PI / 2);

  const leftTemple = new THREE.Mesh(templeGeo, frameMat);
  leftTemple.position.set(0.78, 1.34, 0.70);
  leftTemple.rotation.y = 0.08;
  group.add(leftTemple);

  const rightTemple = new THREE.Mesh(templeGeo, frameMat);
  rightTemple.position.set(-0.78, 1.34, 0.70);
  rightTemple.rotation.y = -0.08;
  group.add(rightTemple);

  return group;
}
