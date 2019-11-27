<template>
	<el-dialog :visible.sync="showDialog" width="80%">
		<el-container style="max-height: 80vh">
			<el-aside width="200px">
				<el-menu id="nameSelector" style="overflow: auto; max-height: 500px;">
					<el-menu-item
						:key="user.id"
						:index="''+user.id"
						v-for="user in $devVars.users"
						@click="updateUser"
					>{{user.nom + " " + user.prenom}}</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="chartContainer">
				Evaluation du salarié
				<apexchart type="radar" height="400" :options="chartOptions" :series="series" />
			</el-main>
		</el-container>
	</el-dialog>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
	name: "DialogRH",
	components: {
		apexchart: VueApexCharts
	},
	data() {
		return {
			showDialog: false,
			dialogTitle: "",
			series: [
				{
					name: "Series 1",
					data: [5, 7, 3, 2, 9]
				}
			],
			chartOptions: {
				labels: ["D", "I", "S", "C", "P"],
				plotOptions: {
					radar: {
						size: 140,
						polygons: {
							strokeColor: "#e9e9e9",
							fill: {
								colors: ["#f8f8f8", "#fff"]
							}
						}
					}
				},
				colors: ["#FF4560"],
				markers: {
					size: 4,
					colors: ["#fff"],
					strokeColor: "#FF4560",
					strokeWidth: 2
				}
			}
		};
	},
	methods: {
		openDialog(idProject) {
			console.log(idProject);
			this.showDialog = true;
			this.dialogTitle = "du projet " + idProject;
		},
		updateUser(selectedUser) {
			console.log(selectedUser.index);
			console.log(this.series[0].data);

			var newSerries = [];
			for (let index = 0; index < 5; index++) {
				newSerries.push(Math.floor(Math.random() * 11));
			}

			this.series = [
				{
					name: "Series 1",
					data: newSerries
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
#nameSelector {
	scrollbar-color: rgb(86, 55, 116) rgb(41, 15, 66);
	scrollbar-width: thin;
}

.chartContainer{
	background-color: white;
	padding: 20px;
	color: black;
	font-size: 2em;
}

</style>