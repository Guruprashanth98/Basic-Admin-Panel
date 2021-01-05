var url = 'https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
$.ajax({
    url: url,
    beforeSend: function(){
        $('#overlay').css('display','block')
    },
    complete: function(){
        $('#overlay').css('display','none')
    },
    success: function(response){
        response = response
        $("tbody").empty()
        response.map(item =>  $('tbody').append(createRow(item)) )
        $("form").submit((e) =>{
            e.preventDefault()
        })
        $("form > input").on('input', (e) =>{
            if(e.target.value){
                $("#info-content").empty()
                $("tbody").empty()
                var str = e.target.value
                str=str.toLowerCase()
                const searchArr = response.filter(item => item.firstName.toLowerCase().indexOf(str) !== -1 )
                searchArr.map(item => $('tbody').append(createRow(item)))
            }
            else{
                $("#info-content").empty()
                $("tbody").empty()
                response.map(item =>  $('tbody').append(createRow(item)) )
            }
        })
    },
    error: function(){
        alert("Api call failed")
    }
})  
    

    //match response.fname with str
    //if match push to newArr
    //iterate newArr create card and append

    


const createRow = data => {
    const tr = $("<tr>").addClass("data-row")
    const tHead = ["id","firstName","lastName","email","phone"]
    tHead.map((item,idx) => {
        const td = $("<td>").addClass("column"+(idx+1))
        const tHeadData = item
        td.append(data[tHeadData])
        tr.append(td)
    })
    tr.click(()=>{ 
        $(".active").removeClass("active")  
        tr.addClass("active")
        displayDetails(data)
    })
    
    return tr
}
 const displayDetails = (obj) => {
    const infoContent = $("#info-content").empty()
    const selection = $("<div>").html("<b>User selected:</b> " + `${obj.firstName} ${obj.lastName}`)
    const description = $("<div>").html("<b>Description: </b> ")
    const textArea = $("<textarea>").attr({"cols":"50" , "rows":"5" , "readonly":true })
    textArea.val(obj.description)
    description.append(textArea)
    infoContent.append(
    selection,
    description,
    $("<div>").html("<b>Address:</b> " + obj.address.streetAddress),
    $("<div>").html("<b>City:</b> " + obj.address.city),
    $("<div>").html("<b>State:</b> " + obj.address.state),
    $("<div>").html("<b>Zip:</b> " + obj.address.zip)
    )
}
