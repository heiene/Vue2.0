Vue.component('booking-calendar', {
	template: 
	`<div> <!-- bare for å ha et root elemnent når datepicker er med-->
		<div class="bc-outer">
			<div class="bc-wrapping" >
				<div class="bc-header">
					<div class="bc-clear">
						<button class="btn btn-default bc-button">Klarer</button>	
					</div>
					<div class="bc-navigation">
						<button class="btn btn-primary bc-button"><i class="fa  fa-chevron-left"></i> forrige</button>
						<button class="btn btn-primary bc-button">neste <i class="fa  fa-chevron-right"></i></button>
					</div>
				</div> <!--bc-header ferdig-->
				<div class="bc-body">
					<div class="bc-item-header">
						<div class="bc-month">
								jan 2017						
						</div>
						<div class="bc-week">
							<div class="bc-week-h">Uke</div>
							<div class="bc-week-h">Ma</div>
							<div class="bc-week-h">Ti</div>
							<div class="bc-week-h">On</div>
							<div class="bc-week-h">To</div>
							<div class="bc-week-h">Fr</div>
							<div class="bc-week-h">Lø</div>
							<div class="bc-week-h">Sø</div>
						</div>
					</div>
					<div class="bc-item" v-for="weekRow in cellId">
						<div class="bc-week-number" v-bind:id="weekRow[0]">1</div>
						<div class="bc-weekday" v-bind:id="weekRow[1]">1</div>
						<div class="bc-weekday" v-bind:id="weekRow[2]">2</div>
						<div class="bc-weekday" v-bind:id="weekRow[3]">3</div>
						<div class="bc-weekday" v-bind:id="weekRow[4]">4</div>
						<div class="bc-weekday" v-bind:id="weekRow[5]">5</div>
						<div class="bc-weekday" v-bind:id="weekRow[6]">6</div>
						<div class="bc-weekday" v-bind:id="weekRow[7]">7</div>
					</div>
				</div> <!--bc-body ferdig-->
				<div class="bc-footer">
					<div class="bc-explain">
						<div class="bc-box bc-available">
						</div>
						<div class="bc-text">
							Ledig
						</div>
					</div>
					<div class="bc-explain">
						<div class="bc-box bc-reserved">
						</div>
						<div class="bc-text">
							Reservert
						</div>
					</div>
					<div class="bc-explain">
						<div class="bc-box bc-booked">
						</div>
						<div class="bc-text">
							Utleid
						</div>
					</div>
				</div> <!--bc-footer ferdig-->
			</div>	<!--bc-wrapping ferdig-->		
		</div> <!--bc-outer ferdig-->
		<div class="bc-picker">
			<div class="bc-picker-from">
				<booking-date-picker
					element-id="test"
					form-name="test-pick"
					element-placeholder="from"
					orientation="bottom left"
				></booking-date-picker>
			</div>
			<div class="bc-picker-to">
				<booking-date-picker
					element-id="test"
					form-name="test-pick"
					element-placeholder="to"
					orientation="bottom right"
				></booking-date-picker>
			</div>	
		</div> <!-- bc-picker slutt -->		
	</div>
	`,
	props: ['test'],
	computed: {
		/*
		| Denne computed propertien brukes for å generere id til alle celler i tabellen
		*/
		cellId: function() {
			const matrix = [];
			const cell = 'cell';
			const week = 'row';
			const delimiter = '-'
			for (var i = 0; i<7; i++) {
				//Lager en rad i matrisen
				const weekArray = [week+delimiter+i];
				for (var y = 0; y<7; y++) {
					weekArray.push(cell+delimiter+i+delimiter+y);
				}
				matrix.push(weekArray);
			}
			return matrix;
		} 
	},
	methods: {
		/*Helper funksjone for å få tak i celleID*/
		getCellId: function(row,cell) {
			return this.cellId[row][cell];
		},
		/*Funksjon for å legge til en klasse på en celle basert på celle id*/
		addCellClass: function(id,addClass) {
			document.querySelector(`#${id}`).classList.add(addClass);
		},
		/*Funksjon for å fjerne en klasse fra en celle basert på celle-id*/
		removeCellClass: function(id,remClass) {
			document.querySelector(`#${id}`).classList.remove(remClass);
		}
		
	},
	mounted: function() {
		console.table(this.cellId);
		
	}

})

Vue.component('booking-date-picker', {
	props: {
		formValue: {
			type: String
		},
		formName: { // the value of the name="" attribute in the form
			type: String
		},
		elementId: { // the value of the id="" attribute of the input element
			type: String
		},
		orientation: { // Placement of date picker. Ex: top left
			type: String
		},
		elementPlaceholder: { // Placeholder in input field
			type: String
		},
		classes: { // classes for the input element,
			type: String
		},
		startDate: {
			type: String
		},
		confirmedDates: {
			type: Array,
			default: function () { return [] }
		},
		reservedDates: {
			type: Array,
			default: function () { return [] }
		} 
	},
	data: function () {
		return {
				format: "dd-mm-yyyy",
				disabledDates: [],
				previousDate: null,
				// requestFeedback: false,
				// awatingFeedback: false,
				// dateChangeOrigin: 'internal' // Assuming internal events as default
		}
	},
	template:   
	`
		<div>
			<input :id="elementId" 
					type="text" 
					:name="formName" 
					class="form-control date-pick" 
					v-on:change="dateChanged" 
					:value="formValue" 
					:placeholder="elementPlaceholder"
			>
		</div>
	`
	,
	methods: {	
		dateChanged: function() {
			console.log("date changed!");
		},
		setDate: function(date) {
			document.querySelector('#'+this.elementId).datepicker('setDate',date);
		},
		getDate: function() {
			return document.querySelector('#'+this.elementId).datepicker('getDate');
		},
		setStartDate: function(startDate) {
			document.querySelector('#'+this.elementId).datepicker('setStartDate',startDate);
		},
		getStartDate: function() {
			console.log("TRIIGGERD");
			return document.querySelector('#'+this.elementId).datepicker('getStartDate');
		},
		show: function() {
			document.querySelector('#'+this.elementId).datepicker('show');
		},
		hide: function() {
			document.querySelector('#'+this.elementId).datepicker('hide');
		}
	},
		mounted: function() {
			var that = this;
			this.disabledDates = this.reservedDates.concat(this.confirmedDates);

			if (! (this.elementId && this.formName)) {
					console.log("You must specify element-id and form-name attributes.");
			}

			if (! this.elementPlaceholder ) {
					this.elementPlaceholder = this.format;
			}

			//Define properties for datepicker
			$('.date-pick').datepicker({
					autoclose: true,
					orientation: this.orientation || 'bottom left',
					format: this.format,
					language: 'no-NO',
					weekStart: 1,
					todayHighlight: true,
					startDate: this.startDate || moment().startOf('day').format("DD-MM-YYYY"),
					datesDisabled: this.disabledDates || null
			});
			
	}
});

new Vue({
	el: '#booking-test'
})