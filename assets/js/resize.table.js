// document.addEventListener('DOMContentLoaded', function () {   
    // createResizableTable(document.getElementById('mainTable'));
// });

const createResizableTable = function (table) {
    const cols = table.querySelectorAll('td');
    [].forEach.call(cols, function (col) {
        createResizable(col, 'C');
    });
    
    const rows = table.querySelectorAll('tr');
    [].forEach.call(rows, function (row) {
        createResizable(row, 'R');
    });
};

const createResizable = function (dom, flag) {
    let downFlag = 0;
    let x = 0;
    let w = 0;
    let y = 0;
    let h = 0;

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

        // console.log(x, w, "mouseDown");
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if(flag === "C") {
            const diffX = e.clientX*1 - x*1;
            const domInd = $(dom).attr('ind');
            const tds = $("." + currDoc + " .table tr").find('td[ind='+domInd+']');
            tds.width(w + diffX);
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