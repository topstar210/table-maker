let tbSetting = {};
let currDoc = "doc-header";
$(document).ready(function () {
  $("#columns").change(function () {
    const _thisVal = $(this).val();
    tbSetting.columns = _thisVal;
  });

  $("#rows").change(function () {
    const _thisVal = $(this).val();
    tbSetting.rows = _thisVal;
  });

  $("#table_height").change(function () {
    const _thisVal = $(this).val();
    tbSetting.table_height = _thisVal;
  });

  $("#table_width").change(function () {
    const _thisVal = $(this).val();
    tbSetting.table_width = _thisVal;
  });

  $("#header_color").change(function () {
    const _thisVal = $(this).val();
    tbSetting.header_color = _thisVal;
  });

  $("#border_color").change(function () {
    const _thisVal = $(this).val();
    tbSetting.border_color = _thisVal;
  });

  $("#border_style").change(function () {
    const _thisVal = $(this).val();
    tbSetting.border_style = _thisVal;
  });

  $("#border_width").change(function () {
    const _thisVal = $(this).val();
    tbSetting.border_width = _thisVal;
  });

  $("#border_collapse").change(function () {
    const _thisVal = $(this).val();
    tbSetting.border_collapse = _thisVal;
  });

  $("#border_spacing").change(function () {
    const _thisVal = $(this).val();
    tbSetting.border_spacing = _thisVal;
  });

  $("#text_align").change(function () {
    const _thisVal = $(this).val();
    tbSetting.text_align = _thisVal;
  });

  $("#padding").change(function () {
    const _thisVal = $(this).val();
    tbSetting.padding = _thisVal;
  });

  $("#caption_side").change(function () {
    const _thisVal = $(this).val();
    tbSetting.caption_side = _thisVal;
  });

  $("#upload_image").click(function (e) {
    $("#fileElem").click();
    e.preventDefault(); // prevent navigation to "#"
  });

  $("#fileElem").change(function (input) {
    let file = input.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      $("#doc-background").attr("src", reader.result);
    };

    reader.onloadend = function () {
      setDocSize();
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  });

	$("#addTb_inHeader").click(function(){
		currDoc = "doc-header";
		$("#settingModalLabel").text("Table Header Settings");
		$('.modal').modal('toggle');
	});
	$("#addTb_inBody").click(function(){
		currDoc = "doc-body";
		$("#settingModalLabel").text("Table Body Settings");
		$('.modal').modal('toggle');
	});
	$("#addTb_inFooter").click(function(){
		currDoc = "doc-footer";
		$("#settingModalLabel").text("Table Footer Settings");
		$('.modal').modal('toggle');
	});

  $("#make_table").click(function () {
    getTableSetting();
    renderTable(tbSetting);
    setTableSetting(currDoc);
    createResizableTable($("."+currDoc+" .table")[0]);

    const mainTbHtm = $("#tb_source").html();
    $(".block-markdown__pre").text(mainTbHtm.trim());
		$('.modal').modal('toggle');
  });

	$(document).on('mouseover','.table-container', function(e) {
		currDoc = $(this).attr("target_id");
		tdSelectFucInit();
	})

  initailFunc();
});

function initailFunc() {
  setDocSize();
	
	// // starting to draw table ----
	// getTableSetting();
	// renderTable(tbSetting);
	// setTableSetting(currDoc);
	// createResizableTable($("."+currDoc+" .table")[0]);
	// // starting to draw table ----
}

function setDocSize() {
  const tbCW = $("#doc-background").width();
  const tbCml = ($(".doc-container").width() - tbCW) / 2;
  $(".table-container").width(tbCW);
  $(".table-container").css("margin-left", tbCml + "px");
}

function renderTable(tableSetting) {
  let tableHtm = document.createElement("table");
	tableHtm.setAttribute("class", "table table-bordered mainTable");
  let tbHtm = document.createElement("tbody");
  const { rows, columns } = tableSetting;

  for (var i = 0; i < rows; i++) {
    const trStr = document.createElement("tr");
    trStr.setAttribute("ind", i);
    let tdStr = ``;
    for (var j = 0; j < columns; j++) {
      tdStr += `<td ind="${j}" contenteditable="true"></td>`;
    }
    trStr.innerHTML = tdStr;
    tbHtm.append(trStr);
  }
	$(tableHtm).html(tbHtm);
  $("."+currDoc).html(tableHtm);
}

function getTableSetting() {
  tbSetting.columns = $("#columns").val();
  tbSetting.rows = $("#rows").val();
  tbSetting.table_height = $("#table_height").val();
  tbSetting.table_width = $("#table_width").val();
  tbSetting.border_color = $("#border_color").val();
  tbSetting.border_width = $("#border_width").val();
  tbSetting.border_collapse = $("#border_collapse").val();
  tbSetting.border_spacing = $("#border_spacing").val();
  tbSetting.text_align = $("#text_align").val();
  tbSetting.padding = $("#padding").val();
  tbSetting.caption_side = $("#caption_side").val();
}

function setTableSetting(selectedDoc) {
  $("."+selectedDoc+" .table").height(tbSetting.table_height);
  $("."+selectedDoc+" .table").width(tbSetting.table_width);
  $("."+selectedDoc+" thead").css("color", tbSetting.table_height);
  $(
    "."+selectedDoc+" .table, ."+selectedDoc+" .table th, ."+selectedDoc+" .table tr, ."+selectedDoc+" .table td"
  ).css("border-color", tbSetting.border_color);
  $(
    "."+selectedDoc+" .table, ."+selectedDoc+" .table th, ."+selectedDoc+" .table tr, ."+selectedDoc+" .table td"
  ).css("border-style", tbSetting.border_style);
  $(
    "."+selectedDoc+" .table, ."+selectedDoc+" .table th, ."+selectedDoc+" .table tr, ."+selectedDoc+" .table td"
  ).css("border-width", tbSetting.table_width + "px");
  $("."+selectedDoc+" .table").css("border-collapse", tbSetting.border_collapse);
  $("."+selectedDoc+" .table").css("border-spacing", tbSetting.border_spacing);
  $("."+selectedDoc+" .table").css("text-align", tbSetting.text_align);
  $(
    "."+selectedDoc+" .table, ."+selectedDoc+" .table th, ."+selectedDoc+" .table tr, ."+selectedDoc+" .table td"
  ).css("padding", tbSetting.padding + "px");
  $("."+selectedDoc+" .table").css("caption-side", tbSetting.caption_side + "px");
}
