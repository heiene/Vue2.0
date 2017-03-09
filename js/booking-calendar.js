Vue.component('booking-calendar', {
	template: 
	`	
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
		setCellClass: function(addClass,id) {
			document.querySelector(`#${id}`).classList.add(addClass);
		},
		/*Funksjon for å fjerne en klasse fra en celle basert på celle-id*/
		removeCellClass: function(removeClass,id) {
			document.querySelector(`#${id}`).classList.remove(removeClass);
		}
		
	},
	mounted: function() {
		
	}

})

new Vue({
	el: '#booking-test'
})