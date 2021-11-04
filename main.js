function dndrop() {
    let block,
        container,
        short_text,
        text,
        image,
        button,
        create_json,
        title,
        app,
        user,
        component


    app = document.querySelector('.app')
    container = document.createElement('div')
    container.classList.add('container')
    app.append(container)


    title = create_elem('input', 'inpt', container)
    button = create_elem('button', 'btn', container, 'click')
    handler_action(container, 'click', 'btn', log)
    // component = create_elem('div', 'block', container, 'fgfgfgfgfg')
    let comp = document.createElement('div')
    comp.classList.add('block')
    let dd = document.createElement('div')
    dd.classList.add('block2')
    container.append(dd)
    dd.append(comp)
    drag_n_drop(comp, dd, container)

}
function handler_action(parent_elem, action, class_elem, handler) {
    parent_elem.addEventListener(action, (e) => {
        if (e.target.classList.contains(class_elem)) {
            handler()
        }
    })

}

function create_elem(type, class_name, parent, value) {
    let name = document.createElement(type)
    name.classList.add(class_name)
    name.textContent = value
    parent.append(name)
}
function log() {
    console.log(1);
}
function drag_n_drop(elem, parent, container) {
    elem.onmousedown = function (event) {

        let posX = event.clientX - elem.getBoundingClientRect().left;
        let posY = event.clientY - elem.getBoundingClientRect().top;
        let limits = {
            top: container.offsetTop,
            right: container.offsetWidth + container.offsetLeft - elem.offsetWidth,
            bottom: container.offsetHeight + container.offsetTop - elem.offsetHeight,
            left: container.offsetLeft
        };

        elem.style.position = 'absolute';
        elem.style.zIndex = 222;

        function moveAt(pageX, pageY) {


            elem.style.top = pageY - posY + 'px';
            elem.style.left = pageX - posX + 'px';

            if ((pageX - posX) > limits.right) {
                console.log(345);
                elem.style.left = limits.right + 'px'
            }
            if((pageX - posX) < limits.left){
                elem.style.left = limits.left + 'px'
            }
            if ((pageY - posY ) < limits.top){
                elem.style.top = limits.top + 'px'

            }
            if ((pageY - posY ) > limits.bottom){
                elem.style.top = limits.bottom + 'px'

            }

        }
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        parent.addEventListener('mousemove', onMouseMove);

        elem.onmouseup = function () {
            parent.removeEventListener('mousemove', onMouseMove);
            elem.onmouseup = null;
        };
    };
    elem.ondragstart = function () {
        return false;
    };
}

dndrop()