class Section {
    constructor(name, func, meta) {
      this.name = name;
      this.func = func;
      this.meta = meta;
      this.parts = new Map();
    }
  
    addPart(key, meta, initValue, options = []) {
      this.part = { meta, options, result: initValue};
      this.parts.set(key, this.part);
      this.part.addOption = function (optKey, optValue) {
            this.option = {optKey, optValue};
            this.options.push(this.option);
            return this;
        };
      return this.part;
    }
  
    setPartResult(part, optionIndex = null) { 
      this.parts.get(part)['result'] = 
        (optionIndex != null) ?
          this.parts.get(part).options[optionIndex].optValue : 0 ;
    }

    getOptionValue(part, index) {
      return this.parts.get(part).options[index].optValue;
    }

    getOptionKey(part, index) {
        return this.parts.get(part).options[index].optKey;
      }
  
    getPartValue(partKey) {
      return this.parts.get(partKey).result;
    }

    getNumberOfParts() {
      return this.parts.size;
    }
   
    getSum() {
      const result = new Map();
        this.parts.forEach((value, key) => result.set(key, value['result']));
      return this.func(result);
    }

    makeGrid(calcAddress) {
      const blocks = [];
      for (let counter = 1; counter <= this.getNumberOfParts(); counter += 1) {
        blocks.push(buildNode(`sect-${counter}`, {id:`sect-${counter}`, class: `sect sect-${counter}`}, '', []));
      };
      const calculatorGrid = buildNode('div', {id: 'grid', class: 'bg-light'}, 'Calculator wrapper', [
        ...blocks,
          buildNode('result-block', {id:'result-block', class: 'sect result-block'}, '', [
            buildNode('h2', {id: 'result-head', class: 'text-black'}, 'Стоимость', []),
            buildNode('p', {id: 'result-desc', class: 'text-black small'}, 'Обращаем Ваше внимание, что результат расёта является приблизительным и в каждом случае зависит от конкретных условий работ.', []),
            buildNode('div', {id: 'final-result', class: 'text-black'}, 'Результаты расчёта', [])
          ]),
      ]);
    
      return $(calcAddress).html(calculatorGrid.toString());
    }

    makePartContainer(content) {
      const container = buildNode('div', {id: `sl-${content.part}`, class: `${content.class} text-center`}, '', [
        buildNode('h3', {class: 'text-white'}, content.heading, []),
        buildNode('p', {class: 'text-warning'}, content.description, []),
        buildNode('div', {id: `slcont-${content.part}`, class: ''}, '', [])
      ]);
      return $(`#${content.address}`).append(container.toString());
    }

    // Slider Creator
    makeSlider(sliderdata) {

    const section = this;

    // create placeholder for slider
    const placeholder = buildNode('div', {id: `slider-${sliderdata.slidername}`}, '', [
      buildNode('div', {id: `slider-legend-${sliderdata.slidername}`, class:'slider-legend text-dark text-center'}, '', []),
      buildNode('div', {id: sliderdata.slidername}, '', [])
    ]);
  
    //render placeholder for addressed div
    $(`#${sliderdata.wrappername}`).append(placeholder.toString());

    // set Init Value to all positions
    this.setPartResult(sliderdata.slidername, sliderdata.initial - 1);
    const optionKey = this.getOptionKey(sliderdata.slidername, sliderdata.initial - 1);
    const optionValue = this.getOptionValue(sliderdata.slidername, sliderdata.initial - 1);
    const initValue = sliderdata.func(optionKey, optionValue);
    $(`#slider-legend-${sliderdata.slidername}`).html(initValue);
    $('#final-result').html(buildNode('div', {id: 'final-price'}, this.getSum() + ' &#8381;', []).toString());

    // set slider from UI jQuery lib into specified div.id
    $(`#${sliderdata.slidername}`).slider({
      range: "max",
      min: sliderdata.min,
      max: sliderdata.max,
      value: sliderdata.initial,
      slide: function(event, ui) {
        //Set current Value to all positions
        section.setPartResult(sliderdata.slidername, ui.value - 1);
        const optionKey = section.getOptionKey(sliderdata.slidername, ui.value - 1);
        const optionValue = section.getOptionValue(sliderdata.slidername, ui.value - 1);
        const innerValue = sliderdata.func(optionKey, optionValue);
        $(`#slider-legend-${sliderdata.slidername}`).html(innerValue);  
        $('#final-result').html(buildNode('div', {id: 'final-price'}, section.getSum() + ' &#8381;', []).toString());
        }
      });  
    }

    renderCalculator(divId) {
      this.makeGrid(divId);
      this.parts.forEach((value, key, map) => {
        const sliderData = {
          wrappername: `slcont-${key}`,
          slidername: key,
          min: 1,
          max: value.options.length,
          initial: value.meta.init,
          func: value.meta.func
        };
        const partContent = {
          part:key,
          heading: value.meta.heading,
          description: value.meta.description,
          address: value.meta.address,
          class: value.meta.class,
          slider: sliderData
        };
        this.makePartContainer(partContent);
        this.makeSlider(sliderData);
      });
    }
  }

  
