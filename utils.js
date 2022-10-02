    //根据cityname、adcode、citycode设置地图位置
    function gotoCity() {
        var val = document.querySelector('#city-name').value; //可以是cityname、adcode、citycode
        if (!val) {
            val = "北京市";
        }
        map.setCity(val);
        log.info(`已跳转至${val}`);
    }

        
        //加载json数据
        function loadjson(prefix) {
            console.log('开始加载 GeoJSON');
            var val = document.querySelector('#json-name').value; //可以是cityname、adcode、citycode
            if (!val) {
                val = "Beijing_polygon.json";
            }            
            json_file = prefix + val;
            console.log("json file is: ", json_file)

            ajax(json_file, function(err, geoJSON) {
                if (!err) {
                    var geojson = new AMap.GeoJSON({
                        geoJSON: geoJSON,
                        // 还可以自定义getMarker和getPolyline
                        getPolygon: function(geojson, lnglats) {
                            // 计算面积
                            // var area = AMap.GeometryUtil.ringArea(lnglats[0])
    
                            return new AMap.Polygon({
                                path: lnglats,
                                // fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                                fillOpacity: 0.2,
                                strokeColor: 'black',
                                fillColor: 'red'
                            });
                        },
    
                        getMarker: function(geojson, lnglats) {
                            // 计算面积
                            // var area = AMap.GeometryUtil.ringArea(lnglats[0])
    
                            return new AMap.Marker({
                                path: lnglats,
                                // fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                                fillOpacity: 0.2,
                                strokeColor: 'black',
                                fillColor: 'red'
                            });
                        }
                    });
                    // gcoord.transform(geojson, gcoord.EPSG4326, gcoord.GCJ02);
                    map.add(geojson);
                    log.success('GeoJSON 数据加载完成')
                    return geojson;                   
                    
                } else {
                    log.error('GeoJSON 服务请求失败')
                }
            })
        }

        //根据lng、lat设置地图位置
        function gotolnglat(){
            var lat = document.querySelector('#lat').value;
            var lng = document.querySelector('#lng').value;

            map.setCenter([lng, lat]); //设置地图中心点
            log.info(`已跳转至${lat, lng}`);
        }

        //显示地图层级与中心点信息
        function logMapinfo(){
            var zoom = map.getZoom(); //获取当前地图级别
            var center = map.getCenter(); //获取当前地图中心位置

            document.querySelector("#map-zoom").innerText = zoom;
            document.querySelector("#map-center").innerText = center.toString();
        }
