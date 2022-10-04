# Amap-Building-Data-Acquisition

## Project Description
Amap (Gaode Map) offers a 2.5D vector building model that is up to date, of high accuracy and covers most major cities in China. However, this data could only be viewed via Amap's web API but is not open for direct download. To have an insight into the recent development in China, this project aims to explore methods for acquiring a georeferenced vector building dataset that covers 100 major cities in China, with both the building footprints and height information.

## Methods
The building data from Amap’s API is part of its default tile map. To acquire the building footprint data, the main idea is to download map tiles (if can not be directly downloaded, by taking screenshots), and then have them georeferenced using the georeferencing tools offered by Amap, and converted them to a vector format (geojson, shapefile, etc.). 

The height information is rather more difficult to obtain. One possible way is to overlay the map with several colored 3D boxes of specified heights, and estimate the height information with a “colormeter”. This I will talk about in the later sections.  

## Current status & and issues
Although the pipeline of the project seems very clear, several critical issues are cumbering me from further developing the data acquisition tool. 

1. What is the best way to download the map image? If it is stored in a certain URL, where will it be? If not, which tool is most suitable for screenshotting without losing the quality of the image? 


2. Amap’s web API offer tools for returning the coordinates of the center of the current map and the pixels that are clicked on, as well as the size of each pixel. Therefore, it is theoretically enough to geolocate each pixel. It remains to be tested where should the control points be, and how many of them should we have to avoid potential projection errors.

3. What tools can be used to vectorize such a great number of images with geoinformation? (Possible tools: GeoPy’s http://geopy.readthedocs.io/en/latest/)

4. The height model is still merely a very raw idea, there probably exists a better solution…

## About Amap JS API
Amap's web API is based on Javascript. The official guide: https://lbs.amap.com/api/jsapi-v2/summary/. To use the API a free security key would be required (in the code there is a part called “加载地图脚本”). I kept my key in the code, but it is recommended to create your own key at the Amap platform. 

### Version control:
Currently, two versions are used in Amap’s guide. V2.0 is suitable for loading local geojson data, while creating 3D objects is now only supported in V1.4. Therefore it is important to use the correct version when loading the JS API. I have also specified it in the name of the code.


### 1. The building layer
Amap’s API offers access to Amap’s multiple tile layers, satellite images and road networks. For this project, we customized the default map layer to show only the building footprint in Balck and their surroundings in White (specify the “mapStyle” parameter when creating the map), as shown in the figure below. It should be noted that the buildings would only appear when the map is zoomed to level 17 or lower, therefore if the map appears to be blank please zoom in to have more details.

![alt text](https://github.com/Muyang-Jiang/Amap-Building-Data-Acquisition/blob/main/pics/building_layer.png)

### 2. Important functions 
Amap offers various functions to manipulate the map. The ones that are important for this project are categorized as follows. 

#### Tiles & Coordinates for georeferencing 
Before the starting of the work, it is recommended to read http://cntchen.github.io/2016/05/09/%E5%9B%BD%E5%86%85%E4%B8%BB%E8%A6%81%E5%9C%B0%E5%9B%BE%E7%93%A6%E7%89%87%E5%9D%90%E6%A0%87%E7%B3%BB%E5%AE%9A%E4%B9%89%E5%8F%8A%E8%AE%A1%E7%AE%97%E5%8E%9F%E7%90%86/ to have more knowledge how the projection of AMap tile map works.

In the code (BaseFunctions_LoadJson_v14.html), I wrote functions for acquiring the coordinates of the current web center and the places that are clicked on. It is also possible to jump into specified coordinates/cities. 

The are some other functions regarding tiles, pixels and coordinates that could be helpful. Layers functions [https://lbs.amap.com/api/javascript-api/reference/layer/] include tileSize for setting the tile size, getTiles() for tile indexing, getTileUrl() for getting tile URL (it would be great if tiles could be directly downloaded via links, though by far have not yet figure out how to). lngLatToPixel and pixelToLngLat (version 2.0 +) are important functions for the conversion between longitude/latitude and pixel coordinates. getScalePerPixel() returns the length of each pixel in meter. 

#### Map munipulation
Useful map functions: panBy(x,y): pan by pixel, panTo(x,y), setZoom(), 

#### Loading local JSON files
It is possible to load local JSON data, as long as the code and the data a from the same server. The code is "BaseFunctions_LoadJson_v20.html". What I did was just creating a simple python server via the command ‘python3 -m http.server 8000’. 

#### Using 3D boxes to estimate the height of buildings
In JS API version 1.4 with 3D mode turned on, users are allowed to create transparent 3D boxes with specified heights. By overlaying multiple boxes, buildings with different heights would appear to have different colors. For example, in the picture shown below, I add a transparent red box every 10 meters, from 0 to 100 m. Buildings higher than 100 m are never covered by any boxes so they remain total black, while lower buildings have been overlaid by several boxes and the roof color appears to be more light.

![alt text](https://github.com/Muyang-Jiang/Amap-Building-Data-Acquisition/blob/main/pics/3Dbox_overlay.png)










