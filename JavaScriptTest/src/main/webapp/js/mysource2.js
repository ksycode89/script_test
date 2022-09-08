// mysource.js 기능
document.addEventListener('DOMContentLoaded', function () {
   
  show();

});


function show (){
   fetch('board') //('./board')
   .then(result => result.json())
   .then(result => {
      let list = document.getElementById('list');
     
     console.log('show'); //3개 담긴거 확인
     console.log(result);  
      result.forEach(element => {
         
         let tr = makeTr(element)
         console.log('tr table')
         console.log(tr)
         list.append(tr);
      });


   })
   .catch(error => console.error(error));
}

function makeTr(data) {
  
   let tr = document.createElement('tr'); //<tr></tr>
   let td = document.createElement('td'); //<td></td>
   let input = document.createElement('input') //<input>
   input.setAttribute('type', 'checkbox'); //<input> => type="checkbox"
   td.appendChild(input); // = <th><input type="checkbox"></th>


    let data2 = [data.bno,data.title,data.content,data.writer,data.creationDate]

   

   


   // 배열로 바꿔주기 , let dataArry = [...data]
   //배열일때foreach
   // let dataArry = [...data]
   // console.log('a');

    data2.forEach(element => {
      console.log(element);
       let td = document.createElement('td'); //<td></td>
       let text = document.createTextNode(element)
       td.append(text); // = <th><input type="checkbox"></th>
       tr.append(td);
    });

   // let td1 = document.createElement('td'); //<td></td>
   // let text1 = document.createTextNode(data.bno);
   // td1.appendChild(text1); // = <th><input type="checkbox"></th>


   // let td2 = document.createElement('td'); //<td></td>
   // let text2 = document.createTextNode(data.title);
   // td2.appendChild(text2); // = <th><input type="checkbox"></th>
   //  // tr.appendChild(td2);

   // let td3 = document.createElement('td'); //<td></td>
   // let text3 = document.createTextNode(data.content)
   // td3.appendChild(text3); // = <th><input type="checkbox"></th>
   //  // tr.appendChild(td3)

   // let td4 = document.createElement('td'); //<td></td>
   // let text4 = document.createTextNode(data.writer)
   // td4.appendChild(text4); // = <th><input type="checkbox"></th>
   //  // tr.appendChild(td4)

   // let td5 = document.createElement('td'); //<td></td>
   // let text5 = document.createTextNode(data.creationDate)
   // td5.appendChild(text5); // = <th><input type="checkbox"></th>
    // tr.appendChild(td5)

   //삭제버튼 만들기
   let td6 = document.createElement('td'); //<td></td>
   let button = document.createElement('button');
   button.innerText = '삭제';
   td6.appendChild(button);
   // tr.appendChild(td6);
console.log(td1)
console.log(td2)
console.log(td3)
console.log(td4)
console.log(td5)

   tr.append(td,td6)
   
   return tr
}
