// document.addEventListener('DOMContentLoaded', function () {   
    // createResizableTable(document.getElementById('mainTable'));
// });

const createResizableTable = function (table) {
    const cols = table.querySelectorAll('td');
    [].forEach.call(cols, function (col) {
        createColumnResizable(col, 'C');
    });
    
    const rows = table.querySelectorAll('tr');
    [].forEach.call(rows, function (row) {
        createColumnResizable(row, 'R');
    });

    createTableResizable(table);
};

const createColumnResizable = function (dom, flag) {
    let downFlag = 0;
    let x = 0;
    let w = 0;
    let y = 0;
    let h = 0;
    let tdWidths = [];

    const mouseDownHandler = function (e) {
        if(!downFlag) return;

        if(flag === "C")
            x = e.clientX;
        else 
            y = e.clientY;

        const styles = window.getComputedStyle(dom);
        if(flag === "C")
            w = parseInt(styles.width, 10);
        else 
            h = parseInt(styles.height, 10);

        const siblingTds = $(dom).parent().children();
        let index = 0;
        for (let i = 0; i < siblingTds.length; i++) {
            const selTd = $(siblingTds[i]).width();
            let colspan = parseInt($(siblingTds[i]).attr('colspan'));
            if(colspan > 0 && siblingTds[i+1] != undefined){
                tdWidths[index] = selTd;
                for (let j = 0; j < colspan; j++) {
                    index++;
                    tdWidths[index] = NaN;
                }
                continue;
            } else {
                tdWidths[index] = selTd;
                index++;
            }
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if(flag === "C") {
            const diffX = e.clientX*1 - x*1;
            const domInd = $(dom).attr('ind') * 1;
            let newTdWidths = [];
            for (let i = 0; i < tdWidths.length; i++) {
                let tdWidth = tdWidths[i];
                if(domInd == i) {
                    newTdWidths[i] = tdWidth + diffX;
                } else if(domInd + 1 == i) {
                    newTdWidths[i] = tdWidth - diffX;
                } else {
                    newTdWidths[i] = tdWidth;
                }
            }
            for (let i = 0; i < newTdWidths.length; i++) {
                let tdWidth = newTdWidths[i];
                $("." + currDoc + " .table tr").find('td[ind='+i+']').width(tdWidth);
            }

        } else {
            const diffY = e.clientY - y;
            dom.style.height = `${h + diffY}px`;
        }

    };

    const mouseUpHandler = function () {
        const mainTbHtm = $("#tb_source").html();
        $(".block-markdown__pre").text(mainTbHtm.trim());
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveOnRowHandler = function (e) {
        const styles = window.getComputedStyle(dom);
        if(flag === "R") {
            const ab_h = parseInt(styles.height, 10);
            if(e.offsetY > (ab_h-5)){
                dom.classList.add('row-resizer');
                downFlag = 1;
            } else {
                dom.classList.remove('row-resizer');
                downFlag = 0;
            }
        } else {
            const ab_w = parseInt(styles.width, 10);
            if(e.offsetX > (ab_w-5)){
                dom.classList.add('col-resizer');
                downFlag = 1;
            } else {
                dom.classList.remove('col-resizer');
                downFlag = 0;
            }
        }
    };

    dom.addEventListener('mousemove', mouseMoveOnRowHandler);  
    dom.addEventListener('mousedown', mouseDownHandler);
};

const createTableResizable = function (table) {
    let editableFlag = 0;
    let w = 0;
    let h = 0
    let downPosX = 0;
    let downPosY = 0;
    let tbMLeft = 0;
    let tbMTop = 0;
    let tbMBottom = 0;
    $(document).on("mousedown mousemove mouseout", ".tb-resize-top-cursor", function(e){
        if(e.type == "mousedown"){
            editableFlag = 1;
            w = $("." + currDoc).width();
            h = $("." + currDoc).height();
            tbMLeft = parseInt($("." + currDoc).css('margin-left'));
            tbMTop = parseInt($("." + currDoc).css('margin-top'));
            downPosX = e.clientX;
            downPosY = e.clientY;
        } else if (e.type == "mousemove") {
            if(editableFlag){
                const diffX = e.clientX*1 - downPosX*1;
                const diffY = e.clientY*1 - downPosY*1;
                const docHeight = h - diffY;
                $("." + currDoc).css({
                    "margin-top": tbMTop + diffY + "px",
                    "margin-left": tbMLeft + diffX + "px",
                    "width": w - diffX +"px"
                });
                const trNum = $("." + currDoc + " .table tr").length;
                const trHeight = docHeight / trNum;
                $("." + currDoc + " .table tr").css({
                    "height": trHeight + "px",
                });
            }
        } else {
            editableFlag = 0;
        }
    });
    $(document).on("mousedown mousemove mouseup", ".tb-resize-bottom-cursor", function(e){
        if(e.type == "mousedown"){
            editableFlag = 1;
            w = $("." + currDoc).width();
            h = $("." + currDoc).height();
            tbMBottom = parseInt($("." + currDoc).css('margin-bottom'));
            downPosX = e.clientX;
            downPosY = e.clientY;
        } else if (e.type == "mousemove") {
            if(editableFlag){
                const diffX = e.clientX*1 - downPosX*1;
                const diffY = e.clientY*1 - downPosY*1;
                const docHeight = h + diffY;
                $("." + currDoc).width(w + diffX);
                $("." + currDoc).css({
                    "margin-bottom": tbMBottom - diffY + "px",
                });

                const trNum = $("." + currDoc + " .table tr").length;
                const trHeight = docHeight / trNum;
                $("." + currDoc + " .table tr").css({
                    "height": trHeight + "px",
                });
            }
        } else {
            // editableFlag = 0;
        }
    });
    $(document).on("mouseup", function(e){
        editableFlag = 0;
    })
}