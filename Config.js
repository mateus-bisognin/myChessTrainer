class ConfigClass {
  constructor() {
    this.div = document.querySelector("div.config");
    this.div.innerHTML = this.loadDom();

    this.time = 4000;
    this.perspective = "white";
    this.draggable = false;
    this.hoverEffect = true;
    this.coordinates = true;

    this.timeMethod();
    this.perspectiveMethod();
    this.draggableMethod();
    this.hoverEffectMethod();
    this.coordinatesMethod();
  }

  timeMethod = () => {
    const group = document.querySelectorAll("input[name=timePerTurn]");
    Array.from(group).forEach((input) => {
      input.onchange = () => {
        const checked = document.querySelector(
          "input[name=timePerTurn]:checked"
        );
        if (!!checked) {
          this.time = checked.value * 1000;
        }
      };
    });
  };
  perspectiveMethod = () => {
    const group = document.querySelectorAll("input[name=perspective]");
    Array.from(group).forEach((input) => {
      input.onchange = () => {
        const checked = document.querySelector(
          "input[name=perspective]:checked"
        );
        if (!!checked) {
          this.perspective = checked.value;
        }
      };
    });
  };
  draggableMethod = () => {
    const group = document.querySelectorAll("input[name=draggable]");
    Array.from(group).forEach((input) => {
      input.onchange = () => {
        const checked = document.querySelector("input[name=draggable]:checked");
        if (!!checked) {
          this.draggable = true;
        } else {
          this.draggable = false;
        }
      };
    });
  };
  hoverEffectMethod = () => {
    const group = document.querySelectorAll("input[name=hoverEffect]");
    Array.from(group).forEach((input) => {
      input.onchange = () => {
        const checked = document.querySelector(
          "input[name=hoverEffect]:checked"
        );
        if (!!checked) {
          this.hoverEffect = true;
        } else {
          this.hoverEffect = false;
        }
      };
    });
  };
  coordinatesMethod = () => {
    const group = document.querySelectorAll("input[name=coordinates]");
    Array.from(group).forEach((input) => {
      input.onchange = () => {
        const checked = document.querySelector(
          "input[name=coordinates]:checked"
        );
        if (!!checked) {
          this.coordinates = true;
        } else {
          this.coordinates = false;
        }
      };
    });
  };
  loadDom = () => {
    return `
    
    <h3>Time</h3>
    <p id="timePerTurn">
    <label><input type="radio" name="timePerTurn" value="1"><span>1s</span></label>
    <label><input type="radio" name="timePerTurn" value="2" ><span>2s</span></label>
    <label><input type="radio" name="timePerTurn" value="3"><span>3s</span></label>
    <label><input type="radio" name="timePerTurn" value="4" checked><span>4s</span></label>
    <label><input type="radio" name="timePerTurn" value="5"><span>5s</span></label>
    <label><input type="radio" name="timePerTurn" value="6"><span>6s</span></label>
    <label><input type="radio" name="timePerTurn" value="7"><span>7s</span></label>
    <label><input type="radio" name="timePerTurn" value="8"><span>8s</span></label>
    </h3>
    

    <h3>Perspective</h3>
    <input type="radio" id="white" name="perspective" value="white" checked>
    <label for="white">White</label><br>
    <input type="radio" id="black" name="perspective" value="black">
    <label for="black">Black</label><br>
    
    <h3>Draggable</h3>
    <label class="switch" id="draggable">
      <input type="checkbox" name="draggable">
      <span class="slider round"></span>
    </label>
    
    <h3>Hover Effect</h3>
    <label class="switch" id="hoverEffect">
      <input type="checkbox" name="hoverEffect" checked>
      <span class="slider round"></span>
    </label>
    
    <h3>Coordinates</h3>
    <label class="switch" id="coordinates">
      <input type="checkbox" name="coordinates" checked>
      <span class="slider round"></span>
    </label>
    
    `;
  };
}

const Config = new ConfigClass();
