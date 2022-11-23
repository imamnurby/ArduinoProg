const response = [
    {
      "id": 446929723,
      "library_name": "DHT20",
      "hw_config": {
        "protocol": "I2C",
        "pin_connection_from_hw_to_arduino": {
          "arduino_mega": [["SDA", "21"], ["SCL", "21"]],
          "arduino_uno": [["SDA", "A4"], ["SCL", "A5"]],
          }
      },
      "usage_patterns": {
        "DHT20": [
          "DHT20.begin DHT20.lastRead DHT20.read DHT20.getHumidity DHT20.getTemperature",
          "DHT20.begin DHT20.read DHT20.getHumidity DHT20.getTemperature",
          "DHT20.begin DHT20.read DHT20.getHumidity"
        ]
      },
      "Sensor Type": "Sensors",
      "Github URL": "https://github.com/RobTillaart/DHT20",
      "Description": "Arduino library for I2C DHT20 temperature and humidity sensor."
    },
    {
      "id": 255120181,
      "library_name": "DHT12",
      "hw_config": {
        "protocol": "I2C",
        "pin_connection_from_hw_to_arduino": {
          "arduino_mega": [["SDA", "20"], ["SCL", "21"]],
          "arduino_uno": [["SDA", "A4"], ["SCL", "A5"]],
          }
        },
      "usage_patterns": {
        "DHT12": [
          "DHT12.begin",
          "DHT12.begin DHT12.lastRead DHT12.read DHT12.getHumidity DHT12.getTemperature",
          "DHT12.begin DHT12.read DHT12.getHumidity DHT12.getTemperature"
        ]
      },
      "Sensor Type": "Sensors",
      "Github URL": "https://github.com/RobTillaart/DHT12",
      "Description": "Arduino library for I2C DHT12 temperature and humidity sensor."
    }
  ];
  
  //display the pop up with more information
  function onClickMore(string){
    document.getElementById(string).style.display ='block';
  }
  
  //hide the pop up with more information
  function onOut(string){
    document.getElementById(string).style.display ='none';
  }
  
  async function getResponse(url, user_query){
    try {
      let predictions = await fetch(url,{
        method: 'POST',
        body: JSON.stringify({'user_query': user_query}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET',
        }
      });
      return predictions.json()
    } catch (error) {
      console.log(error)
    }
  }
    

  //when retrieve is clicked
  async function onSubmit(string){
    //make background with the list on responses to grey
    document.getElementById("grey-container").className = string;
    // var user_query = document.getElementById("exampleFormControlInput1").value
    //url_query = "http://10.27.32.183:8111/predict/?user_query=" + user_input
    // url_query = "http://10.27.32.183:8111/predict"
    // let predictions = await getResponse(url_query, user_query)
    // console.log(predictions['predictions'])
    // test_html = "<p>" + JSON.stringify(predictions['predictions']) + "</p>"
    
    // const response = predictions['predictions']
    // console.log(response)
    
    html = ''


    console.log(response)
    console.log(response.length)
    //loop through number of results
    for(let i=0; i < response.length; i++){
      html += '<div class="row g-4 m-2"><div class="col-6"><div class="card border-primary mb-3"><div class="card-body">';
      html += '<h5 class="card-title text-primary">'+ response[i]["library_name"] +'</h5>';
      html += '<p class="card-text">'+ response[i]["Description"] +'</p></div>' ;
      html += '<div class="card-footer"><div class=" d-flex justify-content-between align-items-center"><div class="btn-group"><a type="button" class="btn btn-sm btn-outline-secondary" href='+ response[i]["Github URL"] +'>View Github</a></div><a href="javascript:void(0)" id="myTooltip" data-bs-toggle="tooltip" data-bs-placement="right" onclick="onClickMore('+ response[i]["id"] +')">See Usage Patterns and Interface Configs</a></div> </div></div></div>';
  
      html += '<div class="col-6"><div id="'+ response[i]["id"] +'" style="display: none;" class="card border-primary mb-3"><div class="card-body"><h5 class="card-title text-primary">Usage Patterns</h5>'
      // html += '<button type="button" class="btn btn-info" data-bs-toggle="collapse" data-bs-target="#collapseExample">Simple collapsible</button>';
      // html += '<div id="collapseExample" class="collapse">';
      // html += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';
      // html += '</div>';
      html += '<div class="position-absolute top-0 end-0"><button type="button" class="btn-close" aria-label="Close" onclick="onOut('+ response[i]["id"] +')"></button>';
      html += '</div>';

      let construct = Object.getOwnPropertyNames(response[i]["usage_patterns"])[0];
      
      // loop through the number of usage patterns
      // for (let x=0; x < response[i]["usage_patterns"][construct].length; x++){
      //   arrSeq = "";
      //   arrSeq = response[i]["usage_patterns"][construct][x].split(" ")
      //   html += '<b data-bs-toggle="collapse" data-bs-target="#collapseExample' + x + '">Pattern ' + (x+1) + ':</b>';
      //   html += '<ul>'
      //   for (let y=0; y<arrSeq.length; y++){
      //     html += '<li id="collapseExample' + x + '"class="collapse">' + arrSeq[y] + '</li>';
      //   }
      //   html += '</ul>';
      // }

      // for (let x=0; x < response[i]["usage_patterns"][construct].length; x++){
      //   arrSeq = "";
      //   arrSeq = response[i]["usage_patterns"][construct][x].split(" ")
      //   html += '<div data-bs-toggle="collapse" data-bs-target="#patternCollapse' + x + '">';
      //   html += '<b>Pattern ' + (x+1) + ':</b>';
      //   html += '<ul>'
      //   for (let y=0; y<arrSeq.length; y++){
      //     html += '<li id="patternCollapse' + x + '"class="collapse">' + arrSeq[y] + '</li>';
      //   }
      //   html += '</ul>';
      //   html += '</div>'
      // }
      html += '<div class="accordion" id="accordionPanelsStayOpenExample">';
      for (let x=0; x < response[i]["usage_patterns"][construct].length; x++){
        arrSeq = "";
        arrSeq = response[i]["usage_patterns"][construct][x].split(" ")
        // html += '<div data-bs-toggle="collapse" data-bs-target="#patternCollapse' + x + '">';
        // html += '<b>Pattern ' + (x+1) + ':</b>';
        html += '<div class="accordion-item">';
        html += '<h2 class="accordion-header" id="panelsStayOpen-heading' + x +'">';
        if (x == 0){
          html += '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse' + x + '" aria-expanded="true" aria-controls="panelsStayOpen-collapse' + x + '">';
        }
        else {
          html += '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse' + x + '" aria-expanded="false" aria-controls="panelsStayOpen-collapse' + x + '">';
        }
        html += 'Pattern' + (x+1);
        html += '</button>';
        html += '</h2>';
        if (x== 0){
          html += '<div style="padding-top: 10px" id="panelsStayOpen-collapse' + x + '" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading' + x + '">';
        } else {
          html += '<div style="padding-top: 10px" id="panelsStayOpen-collapse' + x + '" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading' + x + '">';
        }
        html += '<ul>';
        for (let y=0; y<arrSeq.length; y++){
          html += '<li>' + arrSeq[y] + '</li>';
        }
        html += '</ul>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>'
      html += '<h5 style="padding-top: 10px" class="card-title text-primary">Interface Configuration</h5>';
      html += '<h6>Protocol: '+ response[i]["hw_config"]["protocol"]+ '</h6>';
      // html += '<h6 class="card-title text-primary">Protocol: </h6><h6>'+ response[i]["hw_config"]["protocol"]+ '</h6>';
      html += '<table class="table table-hover"><thead><tr><th>Arduino Type</th><th>I/O hardware --> Arduino</th></tr></thead><tbody>'
  
      //loop through hardware config
      for (const property in response[i]["hw_config"]["pin_connection_from_hw_to_arduino"]){
        let firstLetter = property.charAt(0).toUpperCase();
        let remLetter = property.substring(1).split("_");
  
        html += '<tr><td>' + firstLetter + remLetter[0] + '_' + remLetter[1].charAt(0).toUpperCase() + remLetter[1].substring(1) + '</td><td>';
  
        //loop through the arduino type
        for (let y=0; y < response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property].length; y++){
          html += '(' + (response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property][y][0] + ',' + response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property][y][1]) + ') ';        
        }
        html += ' </td></tr>';
      }
  
      html += '</tbody></table> ';
      // html += '<h6 class="card-title text-primary">Protocol: </h6><h6>'+ response[i]["hw_config"]["protocol"]+ '</h6></div></div>';
      html += '</div></div>';
      html += '</div></div>';
      }
  
    //append the html to the container
    document.getElementById("main-parent").innerHTML = (html);
  
  
    html2 = '<div class="container"><p class="float-right"><a href="#">Back to top</a></p>';
    //append footer to allow going back to the top
    document.getElementById("footer").innerHTML = (html2);
  }
  