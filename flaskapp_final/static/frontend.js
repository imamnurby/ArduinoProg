 
  //display the pop up with more information
  function onClickMore(string){
    document.getElementById(string).style.display ='block';
  }
  
  //hide the pop up with more information
  function onOut(string){
    document.getElementById(string).style.display ='none';
  }
  
  // function to fetch response from the backend
  async function getResponse(url, user_query){
      let final_url = url + '?user_query=' + user_query
      console.log(final_url)

      let predictions = await fetch(final_url)
        .then(res => {
          if (res.ok){
            return res.json()
          } else {
            throw new Error(res.text())
          }
        })
        .catch(error => alert(error))
      return predictions
  }

  //when retrieve is clicked
  async function onSubmit(){
    document.getElementById("spinner").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    document.getElementById("main-parent").innerHTML = '';

    let user_query = document.getElementById("exampleFormControlInput1").value
    // let url_query = "http://10.27.32.183:8111/predict"
    
    if (user_query != ''){
      document.getElementById("spinner").style.display = 'block';
      
      let url_query =  "/predict"
      let predictions = await getResponse(url_query, user_query)
      let response = predictions['predictions']
      document.getElementById("spinner").style.display = 'none';
      // document.getElementById("grey-container").className = 'album py-5 bg-light';
      
      
      
      // if (typeof predictions['predictions'] == "string"){
      if (response.length < 1){
        alert("Library not found in the database. Please try another query!")
        document.getElementById("footer").innerHTML = '';
      } else {
        // let response = predictions['predictions']
        //loop through number of results
        html = ''
        var w = 0
        for(let i=0; i < response.length; i++){
  
          html += '<div class="row g-4 m-2" id="predictions">';                                           
          html +=   '<div class="col-6">';                                                                
          html +=     '<div class="card border-primary mb-3">';                                           
          // library name and description
          html +=       '<div class="card-body">';                                                        
          html +=         '<h5 class="card-title text-primary">'+ response[i]["library_name"] +'</h5>';
          html +=           '<p class="card-text">'+ response[i]["Description"] +'</p>';
          html +=       '</div>';
          // end library name and description                                                                         
          // group button bottom (View GitHub and See Usage Patterns and Configs)      
          html +=         '<div class="card-footer">';                                                    
          html +=           '<div class=" d-flex justify-content-between align-items-center">';           
          html +=             '<div class="btn-group">'                                                   
          html +=               '<a type="button" class="btn btn-sm btn-outline-secondary" href='+ response[i]["Github URL"] +'>View Github</a>';
          html +=             '</div>'                                                                    
          html +=             '<a href="javascript:void(0)" id="myTooltip" data-bs-toggle="tooltip" data-bs-placement="right" onclick="onClickMore('+ response[i]["id"] +')">See Usage Patterns and Interface Configs</a>';
          html +=           '</div>';                                                                     
          html +=         '</div>';                                                                        
          html +=     '</div>';                                                                           
          html +=   '</div>';                                                                             
          // end card group button
          html +=   '<div class="col-6"><div id="'+ response[i]["id"] +'" style="display: none;" class="card border-primary mb-3">';
          html +=     '<div class="card-body">';
          //begin accordion outer
          html += '<div class="accordion" id="accordionOuter'+ i + '">';
          // first item
          html +=   '<div class="accordion-item">';
          html +=     '<h2 class="accordion-header" id="headingOneOuter"'+ i + '>';
          html +=       '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne'+ i +'" aria-expanded="true" aria-controls="collapseOne'+ i +'">'
          html +=          'Interface Configuration';
          html +=        '</button>';
          html +=     '</h2>';
          html +=     '<div id="collapseOne'+ i +'" class="accordion-collapse collapse show" aria-labelledby="headingOneOuter"'+ i +'data-bs-parent="#accordionOuter'+ i + '">'
          html +=       '<div class="accordion-body">'
          // html +=         'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
          
          // interface configuration begin
          html += '<h6>Protocol: '+ response[i]["hw_config"]["protocol"]+ '</h6>';
          html += '<table class="table table-hover"><thead><tr><th>Arduino Type</th><th>I/O hardware --> Arduino</th></tr></thead><tbody>'
          //loop through hardware config
          for (const property in response[i]["hw_config"]["pin_connection_from_hw_to_arduino"]){
            let firstLetter = property.charAt(0).toUpperCase();
            let remLetter = property.substring(1).split("_");
            html += '<tr><td>' + firstLetter + remLetter[0] + '_' + remLetter[1].charAt(0).toUpperCase() + remLetter[1].substring(1) + '</td><td>';
            //loop through the arduino type
            for (let y=0; y < response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property].length; y++){
              // html += '(' + (response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property][y][0] + ',' + response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property][y][1]) + ') ';
              html += '(' + response[i]["hw_config"]["pin_connection_from_hw_to_arduino"][property][y] +') ';        
            }
            html += ' </td></tr>';
          }
          html += '</tbody></table> ';
          // end interface configuration
          
          html +=       '</div>'
          html +=     '</div>'
          html +=   '</div>'
          // end first item
          
          //second item
          html +=   '<div class="accordion-item">';
          html +=     '<h2 class="accordion-header" id="headingTwoOuter'+ i +'">';
          html +=       '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo'+ i +'" aria-expanded="false" aria-controls="collapseTwo'+ i +'">'
          html +=          'Usage Patterns';
          html +=        '</button>';
          html +=     '</h2>';
          html +=     '<div id="collapseTwo'+ i +'" class="accordion-collapse collapse" aria-labelledby="headingTwoOuter'+ i +'" data-bs-parent="#accordionOuter'+ i + '">'
          html +=       '<div class="accordion-body">'
          // html +=         'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
          // begin usage pattern
          let w = 0
          Object.keys(response[i]["usage_patterns"]).forEach(function(key) {        
            let usages_arr = response[i]["usage_patterns"][key]
            // begin accordion inner
            html += '<div class="accordion" id="accordionInner">'
            // begin item
            html += ' <div class="accordion-item">'
            html += '   <h2 class="accordion-header" id="headingOneInner'+ key + i +'">'
            if (w == 0){
            html += '     <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneInner'+ key + i +'" aria-expanded="true" aria-controls="collapseOneInner'+ key + i +'">'
            }
            else {
              html += '     <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneInner'+ key + i +'" aria-expanded="false" aria-controls="collapseOneInner'+ key + i +'">'
            }
            html += '       Sensor Object: '+ key
            html += '     </button>'
            html += '   </h2>'
            if (w == 0){
              html += '   <div id="collapseOneInner'+ key + i +'" class="accordion-collapse collapse show" aria-labelledby="headingOneInner'+ key + i +'">'
            }
            else {
              html += '   <div id="collapseOneInner'+ key + i +'" class="accordion-collapse collapse" aria-labelledby="headingOneInner'+ key + i +'">'
            }
            html += '     <div class="accordion-body">'
            
            // being accordion inner
            html += '<div style="margin-bottom: 15px" class="accordion" id="accordionPanelsStayOpenExample"' + response[i]["id"] + key + '>'; //1
            
            for (let x=0; x < usages_arr.length; x++){
              let pattern = usages_arr[x].split("[API-SEP]")
              html += '<div data-bs-toggle="collapse" data-bs-target="#patternCollapse' + response[i]["id"] + key + x + '">'; //2
              html += '<div class="accordion-item">'; //3
              html += '<h2 class="accordion-header" id="panelsStayOpen-heading' + response[i]["id"] + key +'">';
    
              if (x == 0){
                html += '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse' + response[i]["id"] + key + x + '" aria-expanded="true" aria-controls="panelsStayOpen-collapse' + response[i]["id"] + key + x + '">';
              }
              else {
                html += '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse' + response[i]["id"] + key + x + '" aria-expanded="false" aria-controls="panelsStayOpen-collapse' + response[i]["id"] + key + x + '">';
              }
    
              html += 'Pattern ' + (x+1);
              html += '</button>';
              html += '</h2>';
              
              //4
              if (x== 0){
                html += '<div id="panelsStayOpen-collapse' + response[i]["id"] + key + x + '" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading' + response[i]["id"] + key + x + '">';
              } else {
                html += '<div id="panelsStayOpen-collapse' + response[i]["id"] + key + x + '" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading' + response[i]["id"] + key + x + '">';
              }
              html += '<div class="accordion-body">' //5
              html += '<ul>';
              for (let y=0; y<pattern.length; y++){
                html += '<li>' + pattern[y] + '</li>';
              }
              html += '</ul>';
              html += '</div>' //5
              html += '</div>'; //4
              html += '</div>'; //3
              html += '</div>'; //2
            }
            html += '</div>' //1
    
            html += '     </div>'
            html += '   </div>'
            html += ' </div>'
            //end item
            html += '</div>'
            // end accordion inner
            w += 1
          });
          // end usage pattern 
          
          html +=       '</div>'
          html +=     '</div>'
          html +=   '</div>'
          //end second item
          
          html += '</div>';
          // end accordion outer
          
          //button close
          html +=       '<div class="position-absolute top-0 end-0">'
          html +=         '<button type="button" class="btn-close" aria-label="Close" onclick="onOut('+ response[i]["id"] +')"></button>';
          html +=       '</div>';
          // end button close
          
          html += '</div></div>';
          html += '</div></div>';
        }
        //append the html to the container
        document.getElementById("main-parent").innerHTML = (html);
    
        html2 = '<div class="container"><p class="float-right"><a href="#">Back to top</a></p>';
        //append footer to allow going back to the top
        document.getElementById("footer").innerHTML = (html2);
      }
    }
    else {
      document.getElementById("spinner").style.display = 'none';
    }
  } 
