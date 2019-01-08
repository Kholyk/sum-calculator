// Test
const test = new Section('Грузчики',
args => args.get('hours') * args.get('type') * args.get('qty') + args.get('cargo') * args.get('cargohrs') + args.get('stretch') * 210 + args.get('boxes') * 60 + args.get('vpp') * 250 + args.get('tape') * 50,
{ heading: 'Укажите тариф', description: 'Тариф работы' });


// Define function for create Legend for sliders:
const wt = (key, value) => `${key} ${value} &#8381/ч</span>`;
const workertype = (key, value) => value !==0 ? `${key}<br /><span class="badge  badge-danger">${value} &#8381/ч (в пределах города)</span>`
    : `${key}<br /><span class="badge  badge-danger">Транспорт не требуется</span>`;
const workers = (key, value) => `${key}<br /><span class="badge  badge-danger">${value} чел.</span>`;
const time = (key, value) => {
    if (value === 1) {
        return `${key}<br /><span class="badge  badge-danger">${value} час работы</span>`
    } else if (value < 5) {
        return `${key}<br /><span class="badge  badge-danger">${value} часа работы</span>`
    } else {
       return `${key}<br /><span class="badge  badge-danger">${value} часов работы</span>`
    }
};
const tape = (key, value) => value !== 0 ? `<span class="h3 text-white">${value} &#10005; </span> ${key}`: `${key}`;
const stretch = (key, value) => value !== 0 ? `${key}<span class="h2 text-white">${value} кг</span>`: `${key}`;


test
.addPart('type', {
heading: 'Тип работ',
description: 'Укажите характер работ',
init: 1,
address: 'sect-1', 
class: '',
func: wt
}, 0)
.addOption('<img src="img/tp1.svg"><br /><span class="badge  badge-danger">Грузчик-разнорабочий:', 250)
.addOption('<img src="img/tp2.svg"><br /><span class="badge  badge-danger">Грузчик профильный:', 300)
.addOption('<img src="img/tp3.svg"><br /><span class="badge  badge-danger">Грузчик (стройматериалы):', 350);

test
.addPart('hours', {
heading: 'Грузчики',
description: 'Выберите количество',
init: 1,
address: 'sect-2', 
class: '',
func: workers
}, 0)
.addOption('<img src="img/w1.svg">', 1)
.addOption('<img src="img/w2.svg">', 2)
.addOption('<img src="img/w3.svg">', 3)
.addOption('<img src="img/w4.svg">', 4)
.addOption('<img src="img/w5.svg">', 5)
.addOption('<img src="img/w6.svg">', 6)
.addOption('<img src="img/w7.svg">', 7)
.addOption('<img src="img/w8.svg">', 8)
.addOption('<img src="img/w9.svg">', 9)
.addOption('<img src="img/w10.svg">', 10);


test
.addPart('qty', {
heading: 'Время', 
description: 'Укажите время работы', 
init: 1,
address: 'sect-3',
class: '',
func: time
}, 0)
.addOption('<img src="img/t2.svg">', 2)
.addOption('<img src="img/t3.svg">', 3)
.addOption('<img src="img/t4.svg">', 4)
.addOption('<img src="img/t5.svg">', 5)
.addOption('<img src="img/t6.svg">', 6)
.addOption('<img src="img/t7.svg">', 7)
.addOption('<img src="img/t8.svg">', 8)
.addOption('<img src="img/t9.svg">', 9)
.addOption('<img src="img/t10.svg">', 10)
.addOption('<img src="img/t11.svg">', 11)
.addOption('<img src="img/t12.svg">', 12);

test
.addPart('cargo', {
heading: 'Транспорт',
description: 'Выберите длину?',
init: 1,
address: 'sect-4', 
class: '',
func: workertype
}, 0)
.addOption('<img src="img/g0.svg">', 0)
.addOption('<img src="img/g3.svg">', 400)
.addOption('<img src="img/g4.svg">', 450)
.addOption('<img src="img/g5.svg">', 550);


test
.addPart('cargohrs', {
heading: 'Время', 
description: 'На какое время?', 
init: 1,
address: 'sect-5',
class: '',
func: time
}, 0)
.addOption('<img src="img/t2.svg">', 2)
.addOption('<img src="img/t3.svg">', 3)
.addOption('<img src="img/t4.svg">', 4)
.addOption('<img src="img/t5.svg">', 5)
.addOption('<img src="img/t6.svg">', 6)
.addOption('<img src="img/t7.svg">', 7)
.addOption('<img src="img/t8.svg">', 8)
.addOption('<img src="img/t9.svg">', 9)
.addOption('<img src="img/t10.svg">', 10)
.addOption('<img src="img/t11.svg">', 11)
.addOption('<img src="img/t12.svg">', 12);

// Packaging

test
.addPart('boxes', {
heading: 'Коробки ', 
description: '630 &#10005; 320 &#10005; 340', 
init: 1,
address: 'sect-6',
class: '',
func: tape
}, 0)
.addOption('<img src="img/box0.svg">', 0)
.addOption('<img src="img/box.svg">', 5)
.addOption('<img src="img/box.svg">', 10)
.addOption('<img src="img/box.svg">', 20)
.addOption('<img src="img/box.svg">', 40)
.addOption('<img src="img/box.svg">', 80);

test
.addPart('vpp', {
heading: 'Плёнка', 
description: 'Воздушно пузырчатая', 
init: 1,
address: 'sect-7',
class: '',
func: tape
}, 0)
.addOption('<img src="img/bw0.svg">', 0)
.addOption('<img src="img/bw.svg">', 2)
.addOption('<img src="img/bw.svg">', 4)
.addOption('<img src="img/bw.svg">', 8)
.addOption('<img src="img/bw.svg">', 16)
.addOption('<img src="img/bw.svg">', 32);

test
.addPart('stretch', {
heading: 'Стрейч', 
description: 'Сколько в килограммах?', 
init: 1,
address: 'sect-8',
class: '',
func: stretch
}, 0)
.addOption('<img src="img/roll0.svg">', 0)
.addOption('<img src="img/roll.svg">', 1)
.addOption('<img src="img/roll.svg">', 2)
.addOption('<img src="img/roll.svg">', 5)
.addOption('<img src="img/roll.svg">', 10)
.addOption('<img src="img/roll.svg">', 20);

test
    .addPart('tape', {
        heading: 'Скотч', 
        description: 'Сколько рулонов?', 
        init: 1,
        address: 'sect-9',
        class: '',
        func: tape
    }, 0)
            .addOption('<img src="img/tape0.svg">', 0)
    .addOption('<img src="img/tape.svg">', 10)
    .addOption('<img src="img/tape.svg">', 20)
    .addOption('<img src="img/tape.svg">', 50)
    .addOption('<img src="img/tape.svg">', 100)
    .addOption('<img src="img/tape.svg">', 200);

test.renderCalculator("#calcgrid");