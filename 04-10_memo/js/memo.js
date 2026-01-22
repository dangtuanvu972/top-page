"use strict";
window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能が実装されていません。");
        return;
    }else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        selectTable();
        allClearLocalStorage();
    }
}, false);

function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
      function(e){
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if(key==="" || value==="") {
           Swal.fire({
            title:"Memo app"//タイトル
            , html : "Key、Memoはいずれも必須です。"
            , type : "error"//ダイアログにアイコンを表示したい場合に設定する引数:warning,error,success,info,question
            , allowOutsideClick : false
           });
            return;
        }else{
            let w_msg = "LocalStorageに\n「" + key + " " + value + " 」\nを保存しますか?";
            Swal.fire({
              title : "Memo app"
              , html : w_msg
              , type : "question"
              , showCancelButton : true
            }).then(function(result){
              //確認ダイアログで「OK」を押されたとき、保存する
              if (result.value === true){
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                Swal.fire({
                  title:"Memo app"//
                  , html : w_msg
                  , type : "success"
                  , allowOutsideClick : false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
              }
            });
          }
      },false
    );
    
    }

    function delLocalStorage(){
      const del = document.getElementById("del");
      del.addEventListener("click", function(e){
          e.preventDefault();
          const chkbox1 = document.getElementsByName("chkbox1");
          const table1 = document.getElementById("table1");
          let w_cnt = 0;
          w_cnt = selectCheckBox("del");
  
          if(w_cnt >= 1){
              Swal.fire({
                title: "Memo app",
                html: "LocalStorageから選択されている" + w_cnt + "件を削除しますか？",
                type: "question",
                showCancelButton: true
              }).then(function(result){
                  if(result.value){
                      for(let i = 0; i < chkbox1.length; i++){
                          if(chkbox1[i].checked){
                              localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                          }
                      }
                      viewStorage();
                      Swal.fire({
                        title: "Memo app",
                        html: "LocalStorageから" + w_cnt + "件を削除しました。",
                        type: "success",
                        allowOutsideClick: false
                      });
                      document.getElementById("textKey").value = "";
                      document.getElementById("textMemo").value = "";
                  }
              });
          }
      }, false);  
      const table1 = document.getElementById("table1");
      table1.addEventListener("click", (e) => {
       if(e.target.classList.contains("trash") == true){
        let index = e.target.parentNode.parentNode.rowIndex
        const key = table1.rows[index].cells[1].firstChild.data;
        const value = table1.rows[index].cells[2].firstChild.data;
        let w_delete = `LocalStorageから\n 「${key} ${value}」\nを削除しますか?`;
        Swal.fire({
          title : "Memo app",
          html : w_delete,
          type : "question",
          showCancelButton : true
        }).then(result => {
          if(result.value === true){
            localStorage.removeItem(key);
            viewStorage();
            let w_msg = `LocalStorageから${key} ${value}を削除しました!`;
            Swal.fire({
              title : "Memo app",
              html : w_msg,
              type : "success",
              allowOutsideClick : false
            });
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";

          }
        })
       } 
    }) 
  }
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
      function(e){
        e.preventDefault();
        let w_msg = "LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか?";
        Swal.fire({
          title: "Memo app"
          , html : w_msg
          , type : "question"
          , showCancelButton : true
        }).then(function(result){
          if(result.value){
            if(result.value){
              localStorage.clear();
              // viewStorage.clear(); fukada-del
              viewStorage();
              let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
              Swal.fire({
                title: "Memo app"
                , html : w_msg
                , type : "success"
                , allowOutsideClick : false
              });
              document.getElementById("textKey").value ="";
              document.getElementById("textMemo").value ="";
            }
          }
        }); 
      },false       
    );
};

function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
      function(e){
        e.preventDefault();
        selectCheckBox("select"); 
      },false
    );
}
function selectCheckBox(mode){
    //let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey ="";
    let w_textMemo = "";
    for(let i=0; i < chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                // 選択された行の値を取得
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                  //return w_sel = "1";    
            }
            w_cnt++;
        }
    }
    //ここで画面にセット
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    //選択ボタンを押された時のチェックロジック
    if(mode === "select"){
      if(w_cnt===1){
        return w_cnt;
      }else{
        Swal.fire({
          title: "Memo app"
          , html : "１つ選択してください。"
          , type : "error"
          , allowOutsideClick : false
        });
      }
    }
    //削除ボタンを押された時のチェックロジック
    if(mode === "del"){
      if(w_cnt >= 1){
        return w_cnt;
      }else{
        Swal.fire({
          title: "Memo app"
          , html : "1つ以上選択してください。"
          , type : "error"
          , allowOutsideClick : false
        });
      }
    }

}
  

function viewStorage(){

    const list = document.getElementById("list");
    //html の初期化
    while(list.rows[0]) list.deleteRow(0);

    for(let i=0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);


        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src = 'img/trash_icon.png' class='trash'>";
        
    }


// jQueryのplugin tablesorterを使ってテーブルのソート
// sortList: 引数1...最初からソートしておく列を指定、引数２...０...昇順,1...降順
$("#table1").tablesorter({  //tablesort add
  sortList: [[1,0]]         //tablesort add
});                         //tablesort add

$("#table1").trigger("update"); //tablesort add
}
