<template>
	<div id="projects-container">
		<h1>Liste des projets</h1>
		<hr />
		<el-table :data="rowData">
			<el-table-column
				:key="column.field"
				v-for="column in columnDefs"
				:prop="column.field"
				:label="column.headerName"
			></el-table-column>
			<el-table-column label="Operations" width="400 px">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="success"
						icon="el-icon-video-play"
						v-if="scope.row.statut === 'Ouvert'"
						@click="handleEdit(scope.$index, scope.row)"
					>Jouer</el-button>
					<el-button
						size="mini"
						type="warning"
						icon="el-icon-s-marketing"
						v-if="user.is_rh"
						@click="handleProjectRH(scope.$index, scope.row)"
					>Visu RH</el-button>
					<el-button
						size="mini"
						type="danger"
						icon="el-icon-delete"
						v-if="user.is_rh"
						@click="handleDelete(scope.$index, scope.row)"
					>Supprimer</el-button>
				</template>
			</el-table-column>
		</el-table>
		<dialog-rh ref="dialogRh"></dialog-rh>
	</div>
</template>

<script>
import DialogRh from "../components/DialogRh";

export default {
	name: "Projects",
	data() {
		return {
			columnDefs: [
				{ headerName: "Nom", field: "nom" },
				{ headerName: "Statut", field: "statut" },
				{ headerName: "Tour maximum", field: "tours_max" },
				{ headerName: "Tours jouées", field: "nb_tour_joueur" }
			],
			rowData: [
				{
					id: 1,
					nom: "Bigtax",
					tours_max: 465,
					nb_tour_joueur: 42,
					statut: "Fermé"
				},
				{
					id: 2,
					nom: "Toughjoyfax",
					tours_max: 264,
					nb_tour_joueur: 49,
					statut: "Fermé"
				},
				{
					id: 3,
					nom: "Asoka",
					tours_max: 165,
					nb_tour_joueur: 98,
					statut: "Fermé"
				},
				{
					id: 4,
					nom: "Zaam-Dox",
					tours_max: 255,
					nb_tour_joueur: 70,
					statut: "Fermé"
				},
				{
					id: 5,
					nom: "Solarbreeze",
					tours_max: 409,
					nb_tour_joueur: 62,
					statut: "Ouvert"
				},
				{
					id: 6,
					nom: "Keylex",
					tours_max: 151,
					nb_tour_joueur: 96,
					statut: "Ouvert"
				},
				{
					id: 7,
					nom: "Keylex",
					tours_max: 137,
					nb_tour_joueur: 0,
					statut: "Fermé"
				},
				{
					id: 8,
					nom: "Opela",
					tours_max: 157,
					nb_tour_joueur: 48,
					statut: "Ouvert"
				},
				{
					id: 9,
					nom: "Asoka",
					tours_max: 144,
					nb_tour_joueur: 15,
					statut: "Ouvert"
				},
				{
					id: 10,
					nom: "Latlux",
					tours_max: 385,
					nb_tour_joueur: 46,
					statut: "Fermé"
				}
			],
			user: this.$session.get("user")
		};
	},
	beforeCreate: function() {
		if (!this.$session.exists()) {
			this.$router.push("/login");
		}
	},
	methods: {
		logout: function() {
			this.$session.destroy();
			this.$router.push("/");
		},
		handleEdit(index, row) {
			console.log(index);
			console.log(row);
		},
		handleProjectRH(_index, row) {
			this.$refs.dialogRh.openDialog(row.id)
		}
	},
	components: {
		DialogRh
	}
};
</script>

<style lang="scss" scoped>
hr {
	margin: 10px 0;
	color: #292845;
}
</style>
