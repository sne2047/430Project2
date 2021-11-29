const handleDragon = (e) => {
    e.preventDefault();

    clearError();

    if($("#dragonName").val() == ''){
        //possibly if any of the others are at -1?
        return false;
    }


    sendAjax('POST', $("#dragonForm").attr("action"), $("#dragonForm").serialize(), function() {
        loadDragonsFromServer();
    });

    return false;
};

const DragonForm = (props) => {
    return (
        <form id="dragonForm"
                onSubmit={handleDragon}
                name="dragonForm"
                action="/maker"
                method="POST"
                className="dragonForm"
            >
            <label htmlFor="name">Name:</label>
            <input id="dragonName" type="text" name="name" placeholder="Dragon Name" />
            <label htmlFor="bodyColor">Body Color:</label>
            <select id="dragonBodyColor" name="bodyColor">
                <option value="0">Red</option>
                <option value="1">Green</option>
                <option value="2">Blue</option>
                <option value="3">Purple</option>
            </select>
            <label htmlFor="hornType">Horn Type:</label>
            <select id="dragonHornType" name="hornType">
                <option value="0">Straight</option>
                <option value="1">Swooped Back</option>
                <option value="2">Coiled</option>
            </select>
            <label htmlFor="hornColor">Horn Color:</label>
            <select id="dragonHornColor" name="hornColor">
                <option value="0">Tan</option>
                <option value="1">Dark</option>
                <option value="2">Gold</option>
            </select>
            <label htmlFor="eyeType">Eye Type:</label>
            <select id="dragonEyeType" name="eyeType">
                <option value="0">Standard</option>
                <option value="1">Cute</option>
                <option value="2">Multi-eye</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDragonSubmit" type="submit" value="Make Dragon" />
        </form>
    );
};

const DragonList = function(props) {
    if(props.dragons.length === 0){
        return(
            <div className="dragonList">
                <h3 className="emptyDragon">No Dragons yet</h3>
            </div>
        );
    }

    const dragonNodes = props.dragons.map(function(dragon) {
        return (
            <div key={dragon._id} className="dragon">
                <h3 className="dragonDescription">
                    Name: {dragon.name}
                </h3>
                <p>
                    {dragon.description}
                </p>
            </div>
        );
    });

    return (
        <div className="domoList">
            {dragonNodes}
        </div>
    );
};

const loadDragonsFromServer = () => {
    sendAjax('GET', '/getDragons', null, (data) => {
        ReactDOM.render(
            <DragonList dragons={data.dragons} />, document.querySelector("#Dragons")
        );
    });
};

const setup = (csrf) => {
    ReactDOM.render(
        <DragonForm csrf={csrf} />, document.querySelector("#makeDragon")
    );

    ReactDOM.render(
        <DragonList dragons={[]} />, document.querySelector("#Dragons")
    );

    loadDragonsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken()
});