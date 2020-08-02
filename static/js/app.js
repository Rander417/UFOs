// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
// D3 is a JavaScript library that produces sophisticated and highly dynamic graphics in an HTML webpage
var tbody = d3.select("tbody");

// Build the table to display all of the UFO sightings
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
}

// Keep track of all filters
//var filters = {datetime: "1/13/2010", city: "ackerman"};
var filters = {datetime: "", city: "", state: "", country: "", shape: ""};

//CHALLENGE FUNCTION
// This function will replace your handleClick function
function updateFilters() {

  // Save the value, and id of all filters
  let date_filter_value = d3.select("#datetime").property("value");
  let date_filter_id = d3.select("#datetime").property("id");

  let city_filter_value = d3.select("#city").property("value");
  let city_filter_id = d3.select("#city").property("id");

  let state_filter_value = d3.select("#state").property("value");
  let state_filter_id = d3.select("#state").property("id");

  let country_filter_value = d3.select("#country").property("value");
  let country_filter_id = d3.select("#country").property("id");

  let shape_filter_value = d3.select("#shape").property("value");
  let shape_filter_id = d3.select("#shape").property("id");


  //If-else blocks to remove unused filters
  if (date_filter_value != ""){
    filters[date_filter_id] = date_filter_value;
  } else {
    delete filters.datetime;
  }

  if (city_filter_value != ""){
    filters[city_filter_id] = city_filter_value;
  } else {
    delete filters.city;
  }

  if (state_filter_value != ""){
    filters[state_filter_id] = state_filter_value;
  } else {
    delete filters.state;
  }

  if (country_filter_value != ""){
    filters[country_filter_id] = country_filter_value;
  } else {
    delete filters.country;
  }

  if (shape_filter_value != ""){
    filters[shape_filter_id] = shape_filter_value;
  } else {
    delete filters.shape;
  }

  console.log(Object.keys(filters).length)
  console.log(Object.values(filters).length)
  console.log(filters)

  // Call function to apply all filters and rebuild the table
  filterTable();
}
///////////////////////////////////////////////////////////////////////////////

//*&^&^%%$#$@@$ DELETE THIS BEFORE SUBMISSION
function handleClick() {
  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value");
  let filteredData = tableData;
  
  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }
  
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will just be the original tableData.
  buildTable(filteredData);
}
///////////////////////////////////////////////////////////////////////////////
  
function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  filter_Keys = Object.keys(filters)

  for (x in filter_Keys){
    filterName = Object.keys(filters)[x]
    filteredData = filteredData.filter(row => row[filterName] === filters[filterName]);
  }


  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}


// Attach an event to listen for the form button
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);