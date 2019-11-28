<template>
	<div id="game-container">
		<div id="etatPartie">
			Points restant : {{remainingRessources}}
			<br />
			Tour actuel : {{tourActuel}}
		</div>
		<h1 id="titre">Ressources</h1>

		<div id="attrib-ressources">
			<div class="ressource">
				<img src="../assets/oxygen.png" class="image" @click="addOxy" />
				{{oxy}}
			</div>
			<div class="ressource">
				<img src="../assets/minerai.png" class="image" @click="addFer" />
				{{fer}}
			</div>
			<div class="ressource">
				<img src="../assets/man.png" class="image" @click="addMan" />
				{{man}}
			</div>
			<div class="ressource">
				<img src="../assets/hangar.png" class="image" @click="addSto" />
				{{sto}}
			</div>
		</div>
		<div id="next-turn">
			<el-button type="success" style="width: 85%" @click="addTurn">Tour suivant</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			remainingRessources: 10,
			tourActuel: 1,
			man: 0,
			sto: 0,
			oxy: 0,
			fer: 0
		};
	},
	beforeCreate: function() {
		if (!this.$session.exists()) {
			this.$router.push("/login");
		}
	},
	props: {
		user: Object,
		projectID: Number
	},
	methods: {
		addTurn() {
			this.tourActuel++;
			this.remainingRessources = 10;
		},
		addFer() {
			if (this.remainingRessources >= 1) {
				this.fer++;
				this.remainingRessources--;
			}
		},
		addMan() {
			if (this.remainingRessources >= 1) {
				this.man++;
				this.remainingRessources--;
			}
		},
		addSto() {
			if (this.remainingRessources >= 1) {
				this.sto++;
				this.remainingRessources--;
			}
		},
		addOxy() {
			if (this.remainingRessources >= 1) {
				this.oxy++;
				this.remainingRessources--;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#etatPartie {
	width: 85%;
	height: 100px;
	margin: auto;
	text-align: left;
	font-size: 2em;
}

.ressource {
	& img {
		width: 90%;
		margin: 10px;
		&:hover {
		}
	}
	width: 20%;
	padding: 10px;
	margin: 10px;
	display: inline-block;
	background-color: rgb(126, 49, 126);
	border-radius: 5px;
}
</style>