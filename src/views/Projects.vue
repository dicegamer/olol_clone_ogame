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
						v-if="scope.row.status"
						@click="handleEdit(scope.$index, scope.row)"
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
				{ headerName: "Tour maximum", field: "roundMax" },
				{ headerName: "Tours jouées", field: "pr" }
			],
			rowData: [],
			user: this.$session.get("user")
		};
	},
	beforeCreate: function() {
		if (!this.$session.exists()) {
			this.$router.push("/login");
		}
	},
	mounted(){
		this.getData();
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
			this.$refs.dialogRh.openDialog(row.id);
		},
		getData: async function() {
			try {
				var response = await this.$http.get(
					"http://wksp.julien-bisson.fr:8080/api/projects/"
				);

				if (response.data.status === "success") {
					this.rowData = response.data.data;
					//this.$emit("logged", response.data);
				}
			} catch (e) {
				console.log(e); // 30
			}
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
