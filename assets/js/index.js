$(document).ready(function(){
  $(document).on('keydown','.table td', function(e) {
		const thisInd = $(this).attr("ind");
    const trNode = $(this).parent();
    const tdCnt = trNode.children().length - 1;
    if(thisInd == tdCnt && e.keyCode==13 && e.ctrlKey){
      const trStr = document.createElement("tr");
      trStr.setAttribute("ind", trNode.attr("ind"));
      let tdStr = ``;
      for (var j = 0; j <= tdCnt; j++) {
        tdStr += `<td ind="${j}" contenteditable="true"></td>`;
      }
      trStr.innerHTML = tdStr;
      const selectedTable = $(this).parents("tbody");
      selectedTable.append(trStr);
    }
	});

  $(document).on("mouseover mouseleave", ".doc-control-section>button", function(e){
    if(e.type == "mouseleave"){
      $(this).find("span").hide();
    } else {
      $(this).find("span").show();
    }
  });
  
})