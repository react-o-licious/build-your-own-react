//1.

// Babel transpiles the JSX syntax into the function we define
/** @jsx Didact.createElement */
// const element = (
//     <div id="foo">
//         <a>bar</a>
//         <b/>
//     </div>
// );


function createElement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child)
                ),
        },
    }
};

function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    };
};

const a = "hello";
var div = createElement("div", null, a, "world");
console.log(div);

// Before:
// const element = React.createElement(
//     "div",
//     { id: "foo"},
//     React.createElement("a", null, "bar"),
//     React.createElement("b")
// );



function workLoop(deadline){
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield){
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        );
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
}


requestIdleCallback(workLoop);

function performUnitOfWork(fiber){
    if(!fiber.dom){
        fiber.dom = createDom(fiber);
    }
    if(fiber.parent){
        fiber.parent.dom.appendChild(fiber.dom);
    }
    
    // create new fibers
    const elements = fiber.props.children;
    let index = 0;
    let prevSibling = null
    while( index < elements.length ){
        const element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        };
    }

    // add child or sibling fiber to tree
    if(index === 0){
        fiber.child = newFiber;
    } else {
        prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;

    // TODO return next unit of work
    // search for next unit of work: sibling or parent's sibling
    if(fiber.child ){
        return fiber.child;
    }
    let nextFiber = fiber;
    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}

function createDom(fiber) {
    const dom = 
        element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

    const isProperty = key => key !== "children";
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        });

    const dom = document.createElement(element.type);
    element.props.children.forEach(child =>
        render( child, dom )
    );
    container.appendChild(dom);
}

function render(element, container){
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    };
};

let nextUnitOfWork = null;

const Didact =  {
    createElement,
    render
}

const element = Didact.createElement (
    "div",
    {id: "foo"},
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b"),
)

// const container = document.getElementById("root");

// Before:
// ReactDOM.render(element, container);

// After:
Didact.render(element, container);


// Fiber tree:
// For example: If we wanted to render something like that:
// Didact.render(
//     <div>
//       <h1>
//         <p />
//         <a />
//       </h1>
//       <h2 />
//     </div>,
//     container
//   )

