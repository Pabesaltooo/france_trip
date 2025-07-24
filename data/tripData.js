// This file contains the trip routes and locations for the map app.
// You can edit this file to add or modify your trip data.

export const locations = {
  "Bilbao": [43.2630, -2.9350],
  "Angers": [47.4784, -0.5632],
  "Saumur": [47.2597, -0.0783],
  "Chinon": [47.1677, 0.2384],
  "Langeais": [47.3253, 0.3998],
  "Azay-le-Rideau": [47.2622, 0.4666],
  "Villandry": [47.3408, 0.5145],
  "Loches": [47.1289, 1.0039],
  "Amboise": [47.4136, 0.9827],
  "Tours": [47.3941, 0.6848],
  "Montresor": [47.0921, 1.2069],
  "Chenonceaux": [47.3241, 1.0709],
  "Cheverny": [47.4899, 1.4555],
  "Blois": [47.5861, 1.3359],
  "Orleans": [47.9029, 1.9092],
  "Chambord": [47.6167, 1.5167]
};

export const routes = [
  { date: "1/8 (salida)", points: ["Bilbao", "Angers"], color: "black" },
  { date: "25/7", points: ["Angers", "Saumur", "Chinon", "Angers"], color: "red" },
  { date: "26/7", points: ["Angers", "Langeais", "Azay-le-Rideau", "Villandry", "Loches"], color: "blue" },
  { date: "27/7", points: ["Loches", "Amboise", "Tours", "Loches"], color: "green" },
  { date: "28/7", points: ["Loches", "Montresor", "Chenonceaux", "Loches"], color: "orange" },
  { date: "29/7", points: ["Loches", "Cheverny", "Blois"], color: "purple" },
  { date: "30/7", points: ["Blois", "Orleans", "Blois"], color: "brown" },
  { date: "31/7", points: ["Blois", "Chambord", "Blois"], color: "pink" }
];
export const checkpoints = [
  // 🏰 Castillos
  { name: "Château d'Ussé", wiki: "Castillo de Ussé", coords: [47.2385, 0.3051], emoji: "🏰" },
  { name: "Château de Chinon", wiki: "Castillo de Chinon", coords: [47.1659, 0.2407], emoji: "🏰" },
  { name: "Château de Saumur", wiki: "Castillo de Saumur", coords: [47.2593, -0.0727], emoji: "🏰" },
  { name: "Château de Langeais", wiki: "Castillo de Langeais", coords: [47.3256, 0.4033], emoji: "🏰" },
  { name: "Château d'Azay‑le‑Rideau", wiki: "Castillo de Azay-le-Rideau", coords: [47.2640, 0.4264], emoji: "🏰" },
  { name: "Château de Villandry", wiki: "Castillo de Villandry", coords: [47.2790, 0.4727], emoji: "🌷" },
  { name: "Château d'Amboise", wiki: "Castillo de Amboise", coords: [47.4109, 0.9829], emoji: "🏰" },
  { name: "Château de Chenonceau", wiki: "Castillo de Chenonceau", coords: [47.3240, 1.0700], emoji: "🏰" },
  { name: "Château de Montpoupon", wiki: "Castillo de Montpoupon", coords: [47.1877, 1.2207], emoji: "🏰" },
  { name: "Château de Montrésor", wiki: "Castillo de Montrésor", coords: [47.0922, 1.2068], emoji: "🏰" },
  { name: "Château de Beauregard", wiki: "Castillo de Beauregard (Loir y Cher)", coords: [47.5353, 1.4181], emoji: "🏰" },
  { name: "Château de Cheverny", wiki: "Castillo de Cheverny", coords: [47.4803, 1.5703], emoji: "🏰" },
  { name: "Château de Chambord", wiki: "Castillo de Chambord", coords: [47.6161, 1.5177], emoji: "🏰" },
  { name: "Château de Meung-sur-Loire", wiki: "Castillo de Meung-sur-Loire", coords: [47.8333, 1.7003], emoji: "🏰" },
  { name: "Château de Blois", wiki: "Castillo de Blois", coords: [47.5861, 1.3350], emoji: "🏰" },
  { name: "Château de Loches", wiki: "Castillo de Loches", coords: [47.1238, 0.9956], emoji: "🏰" },

  // 🏘️ Pueblos bonitos
  { name: "Candes-Saint-Martin", wiki: "Candes-Saint-Martin", coords: [47.2152, 0.0596], emoji: "🏘️" },
  { name: "Montsoreau", wiki: "Montsoreau", coords: [47.2153, 0.0633], emoji: "🏘️" },
  { name: "Crissay-sur-Manse", wiki: "Crissay-sur-Manse", coords: [47.1171, 0.4843], emoji: "🏘️" },
  { name: "Chédigny", wiki: "Chédigny", coords: [47.2072, 1.0662], emoji: "🌹" },
  { name: "Montrésor", wiki: "Montrésor", coords: [47.0922, 1.2068], emoji: "🏘️" },
  { name: "Lavardin", wiki: "Lavardin", coords: [47.7486, 0.9574], emoji: "🏘️" },
  { name: "Beaugency", wiki: "Beaugency", coords: [47.7785, 1.6332], emoji: "🏘️" },
  { name: "Saint-Dyé-sur-Loire", wiki: "Saint-Dyé-sur-Loire", coords: [47.6646, 1.5202], emoji: "🏘️" },

  // 🌿 Naturaleza y parques
  { name: "Forêt de Loches", wiki: "Bosque de Loches", coords: [47.1000, 1.1000], emoji: "🌿" },
  { name: "Parque de Chambord", wiki: "Parque de Chambord", coords: [47.6140, 1.5237], emoji: "🌿" },
  { name: "Jardines de Chaumont-sur-Loire", wiki: "Domaine de Chaumont-sur-Loire", coords: [47.4783, 1.1839], emoji: "🌸" },
  { name: "Panorámica de Candes-Saint-Martin", wiki: "Candes-Saint-Martin", coords: [47.2157, 0.0580], emoji: "📸" },
  { name: "Mirador sobre el Loira en Amboise", wiki: "Amboise", coords: [47.4115, 0.9845], emoji: "📸" },

  // ⛪ Abadías
  { name: "Abbaye de Fontevraud", wiki: "Abadía de Fontevraud", coords: [47.1800, 0.0514], emoji: "⛪" },

  // 🍷 Vino y gastronomía
  { name: "Maison des Vins de Loire", wiki: "Saumur", coords: [47.2594, -0.0767], emoji: "🍷" },  // no tiene entrada propia
  { name: "Domaine de la Noblaie", wiki: "Domaine de la Noblaie", coords: [47.1365, 0.2585], emoji: "🍇" },
  { name: "Cave des Roches (granja de setas)", wiki: "La Cave des Roches", coords: [47.4000, 0.9000], emoji: "🍄" },

  // 🏡 Alojamientos curiosos
  { name: "Loire Valley Lodges (treehouses)", wiki: "Loire Valley Lodges", coords: [47.3500, 1.4000], emoji: "🏡" },

  // 🎨 Cultura e historia
  { name: "Clos Lucé (Casa de Leonardo da Vinci)", wiki: "Clos Lucé", coords: [47.4121, 0.9864], emoji: "🎨" },
  { name: "Museo del Compagnonnage (Tours)", wiki: "Musée du Compagnonnage", coords: [47.3967, 0.6892], emoji: "🛠️" }
];
