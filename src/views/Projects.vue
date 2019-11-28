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
						v-if="scope.row.status === 'Ouvert'"
						@click="handlePlay(scope.$index, scope.row)"
					>Jouer</el-button>
					<el-button
						size="mini"
						type="warning"
						icon="el-icon-s-marketing"
						v-if="user.role == 1"
						@click="handleProjectRH(scope.$index, scope.row)"
					>Visu RH</el-button>
					<el-button
						size="mini"
						type="danger"
						icon="el-icon-delete"
						v-if="user.role == 1"
						@click="handleDelete(scope.$index, scope.row)"
					>Supprimer</el-button>
				</template>
			</el-table-column>
		</el-table>
		<dialog-rh ref="dialogRh"></dialog-rh>
		<el-dialog title="Ajout d'un projet" :visible.sync="newProjVisible">
			<el-form :model="newProj">
				<el-form-item label="Nom du projet">
					<el-input v-model="newProj.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nombre de tours max">
					<el-input-number v-model="newProj.roundMax" autocomplete="off" :step="5"></el-input-number>
				</el-form-item>
				<el-form-item label="Nombre de joueurs max">
					<el-input-number v-model="newProj.maxUsers" autocomplete="off" :step="5"></el-input-number>
				</el-form-item>
				<el-form-item label="Profil d'utilisateurs recherché">
					<el-select v-model="newProj.profil" placeholder="Selectionnez">
						<el-option
							v-for="profil in listeProfil"
							:key="profil.id"
							:label="profil.nom"
							:value="profil.nom"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Points par défaut">
					<el-input-number v-model="newProj.pr" autocomplete="off" :step="5"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="doAddProject">Confirm</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import DialogRh from "../components/DialogRh";

export default {
	name: "Projects",
	data() {
		return {
			columnDefs: [
				{ headerName: "Nom", field: "name" },
				{ headerName: "Statut", field: "status" },
				{ headerName: "Tour maximum", field: "round_max" },
				{ headerName: "Tours jouées", field: "pr" }
			],
			listeProfil : [
				{id: 1, nom:"Dominant"},
				{id: 2, nom:"Influent"},
				{id: 3, nom:"Social"},
				{id: 4, nom:"Consciencieux"}
			],
			rowData: [],
			user: this.$session.get("user"),
			newProj: {
				name: "",
				roundMax: 10,
				maxUsers: 10,
				status: true,
				profil: "",
				pr: 20
			},
			newProjVisible: false
		};
	},
	beforeCreate: function() {
		if (!this.$session.exists()) {
			this.$router.push("/login");
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		logout: function() {
			this.$session.destroy();
			this.$router.push("/");
		},
		handlePlay(_index, row) {
			// console.log(row.id);
			this.$emit("letsPlay", row.id)
		},
		props: {
			user: Object,
			projectID: Number
		},
		async handleDelete(_index, row) {
			console.log(row.id);
			try {
				var response = await this.$http.post(
					"http://wksp.julien-bisson.fr:8080/api/project/delete",
					{ id: row.id }
				);

				if (response.data.status === "success") {
					console.log(response.data);
					this.getData();
				}
			} catch (e) {
				console.log(e); // 30
			}
		},
		handleProjectRH(_index, row) {
			this.$refs.dialogRh.openDialog(row.id);
		},
		getData: async function() {
			try {
				var response = await this.$http.get(
					"http://wksp.julien-bisson.fr:8080/api/users/"+this.user.id+"/projects"
				);

				if (response.data.status === "success") {
					//console.log(response.data);
					var dataMieux = []
					for (const row of response.data.data) {
						console.log(row);
						if(row.status === "1"){
							row.status = "Ouvert"
						}
						else {
							row.status = "Fermé"
						}
						dataMieux.push(row)
					}
					this.rowData = dataMieux;
					//this.$emit("logged", response.data);
				}
			} catch (e) {
				console.log(e); // 30
			}
		},
		async doAddProject() {
			var response = await this.$http.post(
				"http://wksp.julien-bisson.fr:8080/api/project/add",
				this.newProj
			);
			if (response.data.status === "success") {
				console.log(response.data);
				this.getData();
				this.newProjVisible = false;
			} else {
				console.log("error");
			}

			// .catch(function(error) {
			// 	console.log(error);
			// });
			// .then(function(error) {
			// 	console.log(error);
			// });
		},
		showNewProj() {
			this.newProjVisible = true;
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
