// ----------Variables------------------

var form=document.getElementById('add-frm');
var items=document.getElementById('items');
var ntitle=document.getElementById('n-title');
var nbody=document.getElementById('n-body');
var tableDiv=document.getElementById('tbl-div');
var search=document.getElementById('srch');
var restbtn=document.getElementById('reset');

var noteCount= 0;
var newNote='';
var isupdate=false;
var record='';
var note='';
var body='';





//-----------Events---------------------
//for page loads
window.onload=updateTable;


//for form submit
form.addEventListener('submit',addNote);//Submit<---Event name


//for search
search.addEventListener('keyup',searchNotes);

//for remove
items.addEventListener('click',removeNote);


//for view
items.addEventListener('click',viewNupdatewnote);


//For Reset 
restbtn.addEventListener('click',resetAll);



//-----------Function-------------------

//update table
function updateTable(){
    //display the tables when notes get added
    if(noteCount > 0){
        tableDiv.style.dispaly= '';
        
        //Update note
        if(isupdate){
            note.firstChild.textContent=ntitle.value;
            note.lastChild.textContent=nbody.value;

            //Reset and update note count
            isupdate=false;
            noteCount--;

        
        }
        //Add a new note
        else{
            items.appendChild(newNote);

        }
    }
    else{
        tableDiv.style.dispaly="none";
       
    }

}


//Add Note
function addNote(e){

    //stop intial behavior
    e.preventDefault();


    //validate inputs
    if(ntitle.value==''|| nbody.value==''){
        alert("Please fill all fields");
    }

    else{
        //Create a new note record

        //New tr
        var tr=document.createElement('tr');
        tr.className='item';

        //New td for title and body
        var td1=document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span=document.createElement('span');
        span.className='note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //New td for view
        var td2=document.createElement('td');
        td2.className='btcelellv';
        var btn1=document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);

        //New td for Delete
        var td3=document.createElement('td');
        td3.className='btcelelld';
        var btn2=document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);

        //Add all tds to tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //Increment note count

        noteCount++;


        //set new note
        newNote=tr;


        //Add or update the note of the table
        updateTable();




    }

    //Reset all
    resetAll();
    
}

//Search notes
function searchNotes(e){
    //Text to lower case
    var searchTxt=e.target.value.toLowerCase();
    
    //Get list
    var list=items.getElementsByClassName('item');
    
    //Convert to an array
    var listArr=Array.from(list);

    listArr.forEach(function(item){

        //get title
        var notetitle=item.firstChild.textContent;

        //Match
        if(notetitle.toLowerCase().indexOf(searchTxt)!=-1){
            item.style.display='';

        }

        else{
            item.style.display='none';
        }

    });
    
}

//Remove note

function removeNote(e){
    if(e.target.id==='del'){
        if(confirm("Are you sure")){

            //Delete notes
            var tr=e.target.parentElement.parentElement;
            items.removeChild(tr);

            //update table
            noteCount--;
            if(noteCount==o){
                updateTable();
            }


        }
    }
    
}

//view & update note

function viewNupdatewnote(e){
    if(e.target.id==='vw'){
        //get the elemnet values & update input fields
        record=e.target.parentElement.parentElement;
        note=record.firstChild;
        ntitle.value=note.firstChild.textContent;
        nbody.value=note.lastChild.textContent;
        isupdate=true;


        

    }
    
}


//Rest all

function resetAll(){
    ntitle.value='';
    nbody.value='';
    isupdate=false;
    newNote='';
}



