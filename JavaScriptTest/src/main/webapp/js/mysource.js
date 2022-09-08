


document.addEventListener('DOMContentLoaded', function() {
    showMember();

  
    
//디비에서 맥스값가져오기
//     fetch('board',{
//         method : 'POST',
//         headers : {'Content-type' : 'application/x-www-form-urlencoded'},
//         body : 'job=nextBno'
//       })
//    .then(result =>result.text())
//    .then(result=>{
//     console.log('max')
//     console.log(result)
//    })
        

    let addBtn = document.getElementById('addBtn')
    addBtn.addEventListener('click', insertBoard) 




    let selectBtn = document.getElementById('selectBtn')
    selectBtn.addEventListener('click',selectDel)
    
    console.log()
    let allbox = document.getElementById('allC')
    allbox.addEventListener('click',()=>{
      console.log(allbox)
            
            let box = document.getElementById('list')
            
           let box2=document.getElementsByClassName('box2')
           
        //    console.log(box2[0].checked=true)
        if(document.getElementById('allC').checked==true){
        for(let i=0;i<box2.length;i++){
            box2[i].checked=true
        } 
        }else if (document.getElementById('allC').checked==false){
            for(let i=0;i<box2.length;i++){
                box2[i].checked=false
            } 
        }
    
    })

// ========================================================
function showMember () {
    let table = document.getElementById('list')
   let newone =0;
    let xhtp = new XMLHttpRequest();
    xhtp.open('get', 'board');
    xhtp.send(); //서버 요청
    
    
    xhtp.onload = function() {

        
      let data = JSON.parse(xhtp.response);
     
    console.log(xhtp.response);
    console.log(data);

        let list = document.getElementById('list');     
      let max = 0;
       data.forEach(data=>{
  //서버의 json파일 ->JSON.parse() ->페이지 출력
          let tr = makeTr(data)
       //   console.log(data.bno)
       if(max<data.bno){
		max=data.bno
}

        document.getElementById('bno').value =max+1;
       list.append(tr);
       });
	

    }
   // console.log(document.getElementsByClassName('getBno'));
    
//     fetch('board')
//           .then(result =>{
//         console.log(result)
//           console.log(JSON.parse(result));
//         let data = JSON.parse(result);
        
//         gdata=data

//          let list = document.getElementById('list');     
//         data.forEach(data=>{
//    //서버의 json파일 ->JSON.parse() ->페이지 출력
//            let tr = makeTr(data)
        
//         list.append(tr);
//         });
//       })
      
	    
    
    }
  

    function makeTr(data){

        let tr = document.createElement('tr');
         
        let td0 = document.createElement('td');
        let check =  document.createElement('input')
        // console.log(check)
        check.setAttribute('type','checkbox')
        check.setAttribute('class','box2')

        //console.log('makeTr')
        //console.log(data.bno)

        // check.setAttribute('checked',6)
        td0.appendChild(check)
        // check all
         check.addEventListener('change',()=>{
             let checkboxs= document.getElementsByClassName('box2')
             console.log(document.getElementById('allC').checked)

            document.getElementById('allC').checked
                    = [...checkboxs].every(value=>value.checked)

         })


         let td = document.createElement('td');
         let txt = document.createTextNode(data.bno);
         td.setAttribute('class','getBno')
         td.appendChild(txt); //bno
         
         let td2 = document.createElement('td');
         let txt2 = document.createTextNode(data.title);
         td2.appendChild(txt2); //title
         
         let td3 = document.createElement('td');
         let txt3 = document.createTextNode(data.content);
         td3.appendChild(txt3); //content

         let td4 = document.createElement('td');
         let txt4 = document.createTextNode(data.writer);
         td4.appendChild(txt4); //write

         let td5 = document.createElement('td');
         let txt5 = document.createTextNode(data.creationDate);
         td5.appendChild(txt5); //date
         


         let td6 = document.createElement('td');
         let txt6 = document.createTextNode('삭제');
         let btn = document.createElement('button');

         btn.addEventListener('click',delMemberF)

         
         btn.appendChild(txt6);
         td6.appendChild(btn); //email
         
         tr.append(td0,td, td2, td3,td4,td5,td6);
         
         return tr
}

   
 function delMemberF(){

        // console.log("check")
       
     let id =  this.parentElement.parentElement.children[1].textContent
        // let param = "mid="+id+"&mpw="+ps+"&mnm="+ns;
        // console.log("del구문")
        // console.log(id)
        fetch('board',{
            method : 'POST',
            headers : {'Content-type' : 'application/x-www-form-urlencoded'},
            body : 'delete_no='+id+'&job=delete'
          })           
          .then(result => result.text())
          .then(result =>{
            if(result =='succ'){
                // console.log(this)
                this.parentElement.parentElement.remove();
                alert('삭제성공')
               

            }else if (result == 'fail'){
            alert('삭제실패')
                
            }
            
        })
        .catch(error => console.log(error));
    
 
 }



 function insertBoard(arg){
   
    // bno ,
    // title ,
    // content,
    // writer ,
    // creation_date,

        let bno = document.getElementById('bno').value
        let title = document.getElementById('title').value
        let content = document.getElementById('content').value
        let writer = document.getElementById('writer').value
        let date = new Date
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
       
        let fullDay = month+'월 '+day+', '+year
        
       
   
       
        
        fetch('board',{
            method : 'POST',
            headers : {'Content-type' : 'application/x-www-form-urlencoded'},
            body : 'bno='+bno+'&title='+title+'&content='+content+'&writer='+writer+'&job=inser'
          })
	
          .then(result => result.text())
          .then(result =>{
            if(result =='succ'){
	        // console.log(document.getElementById('bno'))
            //    let test = {"id":1,"first_name":"Jehu","last_name":"Leneve"}
            const mValues = 
                    {"bno":bno,"title":title,"content":content,"writer":writer,"creationDate":fullDay}
                   
                

				console.log(mValues)
                console.log(fullDay)
                let tr = makeTr(mValues);
                
                document.getElementById('list').appendChild(tr)
      

               //console.log(title)
         //       bno= '' 
         //document.getElementById('bno').focus();
         
        }else{
            alert('입력실패')
            
        }
        
    })
    .catch(error => console.log(error));
//디비에서 맥스값 sql문이용하기    
//     fetch('board',{
//         method : 'POST',
//         headers : {'Content-type' : 'application/x-www-form-urlencoded'},
//         body : 'job=nextBno'
//       })
//    .then(result =>result.text())
//    .then(result=>{
//    })
	

  	document.getElementById('bno').value++
    document.getElementById('title').value =''
    document.getElementById('content').value =''
    document.getElementById('writer').value =''
    document.getElementById('bno').focus();
// =================================================================// mysource.js
    }

//     let allChekc = function(){
    
//         let box = document.getElementById('list')
        
//        let box2=document.getElementsByClassName('box2')
       
//     //    console.log(box2[0].checked=true)
//     if(document.getElementById('allC').checked==true){
//     for(let i=0;i<box2.length;i++){
//         box2[i].checked=true
//     } 
//     }
// }


 function selectDel (){
console.log("a")
    let checkPro = document.getElementsByClassName('box2')
       let a = [...checkPro]
    // console.log(a)
    a.forEach(mem=>{
      
        if(mem.checked==true){
            console.log(mem.parentElement.nextElementSibling.innerText)
                  mem.parentElement.parentElement.remove();
               let bno =  mem.parentElement.nextElementSibling.innerText

                  fetch('board',{
                    method : 'POST',
                    headers : {'Content-type' : 'application/x-www-form-urlencoded'},
                    body : 'delete_no='+bno+'&job=delete'
                  })         
                  .then(result => result.text())
                  .then(result =>{
                    if(result =='succ'){
                        

                        
                        //alert('삭제성공')
                       
            
                    }else{
                    alert('삭제실패')
                        
                    }
                    
                })
                .catch(error => console.log(error));
           
        }
    
    })




}

})

function delMember2(bno){

    console.log("check")
   
    // let param = "mid="+id+"&mpw="+ps+"&mnm="+ns;
    console.log("del구문")
    console.log(id)
    fetch('board',{
        method : 'POST',
        headers : {'Content-type' : 'application/x-www-form-urlencoded'},
        body : 'delete_no='+bno+'&job=delete'
      })
      .then(result => result.text())
      .then(result =>{
        if(result =='succ'){
            console.log("삭제안구문")
            this.parentElement.parentElement.remove();
            alert('삭제성공')
           

        }else{
        alert('삭제실패')
            
        }
        
    })
    .catch(error => console.log(error));


}
