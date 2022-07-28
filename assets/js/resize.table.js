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

        const oneTr = $("." + currDoc + " .table tr")[0];
        for (let i = 0; i < $(oneTr).children().length; i++) {
            const originTdWidth = $("." + currDoc + " .table tr").find('td[ind='+i+']').width();
            tdWidths[i] = originTdWidth;
        }

        // console.log(x, w, "mouseDown");
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if(flag === "C") {
            const diffX = e.clientX*1 - x*1;
            
            // // mode 1
            // dom.style.width = w + diffX + 'px';
            
            // mode 4
            const domInd = $(dom).attr('ind');
            let newTdWidths = [];
            for (let i = 0; i < tdWidths.length; i++) {
                let tdWidth = tdWidths[i];
                if(domInd == i) {
                    newTdWidths[i] = tdWidth + diffX;
                } else if(domInd*1 + 1 == i) {
                    newTdWidths[i] = tdWidth - diffX;
                } else {
                    newTdWidths[i] = tdWidth;
                }
            }
            // console.log(domInd, newTdWidths);return;
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