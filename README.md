# Amap-Building-Data-Acquisition

## Project Description
Amap (Gaode Map) offers a 2.5D vector building model that is up to date, of high accuracy and covers most major cities in China. However, this data could only be viewed via Amap's web API but is not open for direct download. To have an insight into the recent development in China, this project aims to explore methods for acquiring a georeferenced vector building dataset that covers 100 major cities in China, with both the building footprints and height information.

## Methods
The building data from Amap’s API is part of its default tile map. The main idea is to download these tiles (if can not be directly downloaded, by taking screenshots), and have them georeferenced and converted to a vector format (geojson, shapefile, etc.). 

Amap's web API is based on Javascript. The official guide: https://lbs.amap.com/api/jsapi-v2/summary/. To use the API a free security key would be required (in the code there is a part called “加载地图脚本”). I removed my key in the code, you may either create yours at the Amap platform or contact me at jiang.mu.yang@outlook.com for more information. 

### 1. The building layer
Amap’s API offers access to Amap’s multiple tile layers, satellite images and road networks. For this project, we customized the default map layer to show only the building footprint in Balck and their surroundings in White (specify the “mapStyle” parameter when creating the map), as shown in the figure below. It should be noted that the buildings would only appear when the map is zoomed to level 17 or lower, therefore if the map appears to be blank please zoom in to have more details.

![alt text](https://github.com/Muyang-Jiang/Amap-Building-Data-Acquisition/blob/main/pics/building_layer.png)


