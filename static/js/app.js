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
var filters = {datetime: "1/13/2010"};

//CHALLENGE FUNCTION
// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let filter_value = d3.select("#datetime").property("value");
  let filter_id = d3.select("#datetime").property("id");


  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  //for (x=0; x< Object.keys(filters).length; x++){
    if (filter_value){
      filters[filter_id] = filter_value;
    } else{
      delete filters.filter_id;
    }
  //}

  // console.log(Object.keys(filters).length)
  // console.log(filter_value)
  // console.log(filter_id)
  // console.log(filters)
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