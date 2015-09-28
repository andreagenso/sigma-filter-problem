/**
* Draw Sigma graph
**/

sigma.utils.pkg('sigma.canvas.nodes');

function drawGraph(ns, callbackName, idSection, inputName) {
    var callbackFullPath = "App.namespace('" + ns + "')." + callbackName;
    var section = "#" + idSection + " form input[name=" + inputName + "]";

    var s;
    var filter;

    data = {result: {
        nodes : [
                {id: "1", label: "Node 1", typeNode: 1, attributes: {gender: "F", age: "10", company: "Comp 1", state: "State 1", city: "City 1", contactType: "Supporter"}},
                {id: "2", label: "Node 2", typeNode: 1, attributes: {gender: "M", age: "20", company: "Comp 2", state: "State 2", city: "City 2", contactType: "Supporter"}},
                {id: "3", label: "Node 3", typeNode: 1, attributes: {gender: "F", age: "30", company: "Comp 3", state: "State 3", city: "City 3", contactType: "Supporter"}},
                {id: "4", label: "Node 4", typeNode: 1, attributes: {gender: "M", age: "40", company: "Comp 1", state: "State 1", city: "City 1", contactType: "Supporter"}},
                {id: "5", label: "Node 5", typeNode: 1, attributes: {gender: "F", age: "50", company: "Comp 2", state: "State 2", city: "City 2", contactType: "Supporter"}},
                {id: "6", label: "Campaign x", typeNode: 2, attributes: {gender: "F", age: "60", company: "Comp 3", state: "State 3", city: "City 3", contactType: "Supporter"}},
                {id: "7", label: "Campaign y", typeNode: 2, attributes: {gender: "M", age: "10", company: "Comp 1", state: "State 1", city: "City 1", contactType: "Supporter"}},
                {id: "8", label: "Campaign z", typeNode: 2, attributes: {gender: "F", age: "20", company: "Comp 2", state: "State 2", city: "City 2", contactType: "Supporter"}},
                {id: "9", label: "Campaign m", typeNode: 2, attributes: {gender: "M", age: "30", company: "Comp 3", state: "State 3", city: "City 3", contactType: "Supporter"}},
                {id: "10", label: "Campaign d", typeNode: 2, attributes: {gender: "F", age: "40", company: "Comp 3", state: "State 3", city: "City 1", contactType: "Supporter"}}],
        edges : [
                 {source: "1", target: "5", typeEdge: {name: "Connected"}},
                 {source: "2", target: "3", typeEdge: {name: "Connected"}},
                 {source: "2", target: "4", typeEdge: {name: "Connected"}},
                 {source: "2", target: "5", typeEdge: {name: "Connected"}},
                 {source: "3", target: "4", typeEdge: {name: "Connected"}},
                 {source: "5", target: "2", typeEdge: {name: "Connected"}},
                 {source: "6", target: "1", typeEdge: {name: "Connected"}},
                 {source: "6", target: "2", typeEdge: {name: "Connected"}},
                 {source: "7", target: "4", typeEdge: {name: "Connected"}},
                 {source: "8", target: "3", typeEdge: {name: "Connected"}}
        ]
    } };

    // App.namespace(ns)[callbackName] = function(data) {
    // document.getElementById("#graph-container").remove();
        $('#graph-container').empty();
        console.log(" call to visualize");

        visualize(data);
    //};


    // visualize graph
    function visualize(data) {
        if (s) {
            s.kill();
        }

        /**
         * DOM utility functions
         */
        var _ = {
          $: function (id) {
            return document.getElementById(id);
          },

          all: function (selectors) {
            return document.querySelectorAll(selectors);
          },

          removeClass: function(selectors, cssClass) {
            var nodes = document.querySelectorAll(selectors);
            var l = nodes.length;
            for ( i = 0 ; i < l; i++ ) {
              var el = nodes[i];
              // Bootstrap compatibility
              el.className = el.className.replace(cssClass, '');
            }
          },

          addClass: function (selectors, cssClass) {
            var nodes = document.querySelectorAll(selectors);
            var l = nodes.length;
            for ( i = 0 ; i < l; i++ ) {
              var el = nodes[i];
              // Bootstrap compatibility
              if (-1 == el.className.indexOf(cssClass)) {
                el.className += ' ' + cssClass;
              }
            }
          },

          show: function (selectors) {
            this.removeClass(selectors, 'hidden');
          },

          hide: function (selectors) {
            this.addClass(selectors, 'hidden');
          },

          toggle: function (selectors, cssClass) {
            var cssClass = cssClass || "hidden";
            var nodes = document.querySelectorAll(selectors);
            var l = nodes.length;
            for ( i = 0 ; i < l; i++ ) {
              var el = nodes[i];
              //el.style.display = (el.style.display != 'none' ? 'none' : '' );
              // Bootstrap compatibility
              if (-1 !== el.className.indexOf(cssClass)) {
                el.className = el.className.replace(cssClass, '');
              } else {
                el.className += ' ' + cssClass;
              }
            }
          }
        };


        var i,
        g = {
          nodes: [],
          edges: []
        };

        for (i = 0; i < data.result.nodes.length; i++) {

            var node = {
                id: 'n' + data.result.nodes[i].id,
                label: data.result.nodes[i].label + "\n $us." + data.result.nodes[i].attributes.contribution ,
                // note the ShapeLibrary.enumerate() returns the names of all
                // supported renderers
                x: Math.random(),
                y: Math.random(),
                size: data.result.nodes[i].attributes.contribution ,
                color: '#666',
                attributes: data.result.nodes[i].attributes
              };

            // cutomShapeNode(node);
            g.nodes.push(node);
        }

        for (i = 0; i < data.result.edges.length; i++) {
          g.edges.push({
            id: 'e' + i,
            source: 'n' + data.result.edges[i].source ,
            target: 'n' + data.result.edges[i].target,
            size: Math.random(),
            color: '#ccc'
          });
        }

        /*
        s = new sigma({
          graph: g,
          container: 'graph-container',
          renderer: {
              container: document.getElementById('graph-container'),
              type: 'canvas'
          },
          settings: {
            edgeColor: 'default',
            defaultEdgeColor: '#F00',
          }
        });

        */

        s = new sigma({
          graph: g,
          container: 'graph-container',
          settings: {
            edgeColor: 'default',
            defaultEdgeColor: '#F00',
          }
        });

        CustomShapes.init(s);
        s.refresh();

        // filter
        filter = new sigma.plugins.filter(s);

        updatePane(s.graph, filter);

        _.$('min-degree').addEventListener("input", applyMinDegreeFilter);  // for Chrome and FF
        _.$('min-degree').addEventListener("change", applyMinDegreeFilter); // for IE10+,
        _.$('node-city').addEventListener("change", applyCityFilter);


        /*
        ---------------------------------------------------------------------
         Functions
          ---------------------------------------------------------------------
        */
        function cutomShapeNode(node) {

            switch(node.type) {
                case "equilateral":
                  node.equilateral = {
                    rotate: Math.random()*45, // random rotate up to 45 deg
                    numPoints: Math.round(5 + Math.random()*3)
                  }
                  break;
                case "star":
                  node.star = {
                    innerRatio: 0.4 + Math.random()*0.2,
                    numPoints: Math.round(4 + Math.random()*3)
                  }
                  if(node.image) {
                    // note clip/scale are ratio values. So we fit them to the inner ratio of the star shape
                    node.image.clip = node.star.innerRatio *0.95;
                    node.image.scale = node.star.innerRatio *1.2;
                  }
                  break;
                case "square":
                case "diamond":
                  if(node.image) {
                    // note clip/scale are ratio values. So we fit them to the borders of the square shape
                    node.image.clip = 0.7;
                  }
                  break;
                case "circle":
                  break;
                case "cross":
                  node.cross = {
                    lineWeight: Math.round(Math.random() * 5)
                  }
                  break;
              }
        }

        // apply filter
        function applyMinDegreeFilter(e) {
            var v = e.target.value;
            _.$('min-degree-val').textContent = v;

            filter
              .undo('min-degree')
              .nodesBy(function(n) {
                return parseInt(n.attributes.age) >= v;
              }, 'min-degree')
              .apply();
        }



        function applyCityFilter(e) {
          var c = e.target[e.target.selectedIndex].value;
          filter
            .undo('node-city')
            .nodesBy(function(n) {
              return !c.length || n.attributes.city === c;
            }, 'node-city')
            .apply();
        }

        // update based on filters
        function updatePane (graph, filter) {
        // get max degree
          var maxDegree = 0,
              cities = {};
          // read nodes
          graph.nodes().forEach(function(n) {

            maxDegree = Math.max(maxDegree, n.attributes.age);
            cities[n.attributes.city] = true;
          })

          // min degree
          _.$('min-degree').max = maxDegree;
          _.$('max-degree-value').textContent = maxDegree;


          function createNodeElement(id, defaultOption, optionValues) {

            document.getElementById(id).innerHTML = "";

            var nodecategoryElt = _.$(id);

            var optionDefault = document.createElement("option");
            optionDefault.text = defaultOption;
            nodecategoryElt.add(optionDefault);

            Object.keys(optionValues).forEach(function(c) {
                var optionElt = document.createElement("option");
                optionElt.text = c;
                nodecategoryElt.add(optionElt);
            });
          }

          createNodeElement("node-city", "All Cities", cities);

          // reset button
          _.$('reset-btn').addEventListener("click", function(e) {
          _.$('min-degree').value = 0;
          _.$('min-degree-val').textContent = '0';
          _.$('node-city').selectedIndex = 0;
          filter.undo().apply();
            _.$('dump').textContent = '';
            _.hide('#dump');
          });

          // export button
          _.$('export-btn').addEventListener("click", function(e) {
            var chain = filter.export();
            console.log(chain);
            _.$('dump').textContent = JSON.stringify(chain);
            _.show('#dump');
          });

        }

    }
}