<template>
<div>
    <div>
        <span v-if="!loaded"><img src="../assets/img/Spin-1s-200px.gif" class="loader" /></span>
    </div>
    <div class="container-fluid list-template" v-show="loaded">
        <div class="row">
            <modal name="filters" width="80%" height="auto" :scrollable="true">
                <filters @filters="executeFilters"></filters>
            </modal>
            <modal name="messageModal" width="80%" height="auto" :scrollable="true" >
                <message :user="$store.getters.user"></message>
            </modal>
            <div class="header">
                <button class="btn btn-warning " v-on:click="openFilters()"><i class="fas fa-filter"></i> {{ t('FILTERS') }} </button>
            </div>
            <div v-if="!users.length">
                <center>
                    <h1>{{ t("NO_FILTERS_RESULTS") }}</h1>
                </center>
            </div>
            <!-- <div  >
                    <b-navbar toggleable="lg" type="dark" variant="info">
                        {{filters}}
                    </b-navbar>
                 </div>  -->
            <div id="users" v-for="user in users" class="col-lg-3">
                <div class="card  cardList">
                    <img v-lazy="user.img" v-if="user.img !== ''" @error="replaceByDefault" class="card-img-top" alt="..." />
                    <img v-if="user.img == ''" src="../assets/img/defaut.png" class="card-img-top" alt="..." />
                    <div class="card-body ">
                        <h5 class="card-title">{{ user.prenom }} {{ user.nom }}</h5>
                        <p class="card-text">
                            <div class="nav nav nav-pills mb-12" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link active" id="v-pills-home-tab " data-toggle="pill" :href="'#v-pills-home' + user._id" role="tab" :aria-controls="'v-pills-home' + user._id" aria-selected="true"><i class="fas fa-info"></i></a>
                                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" :href="'#v-pills-profile' + user._id" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-file"></i></a>
                                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" :href="'#v-pills-groups' + user._id" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-users"></i></a>
                            </div>
                            <div class="tab-content" id="v-pills-tabContent" style="min-height:70px;">
                                <div class="tab-pane fade show active" :id="'v-pills-home' + user._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <h6>{{ t('JOB') }}: {{ user.job }}</h6>
                                    Mantra : {{ user.mentra }}<br />
                                    <span v-if="user.age">{{ t('AGE') }}: {{ user.age }}</span>
                                </div>
                                <div class="tab-pane fade" :id="'v-pills-profile' + user._id" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <label> {{ t('FTP_FILES') }}: </label><br />
                                    <span class="badge badge-warning" v-for="f in user.filenames"> <i class="fas fa-file"></i> {{ f.filename }}</span>
                                    <span class="badge badge-warning" v-if="!user.filenames.length"> {{ t('USER_HAS_NO_FILES') }} </span>
                                </div>
                                <div class="tab-pane fade" :id="'v-pills-groups' + user._id" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div>
                                        <label> {{ t('TEAMS') }}: </label><br />
                                        <div class="badge badge-success" v-for="groupName in user.groups"><i class="fas fa-users"></i> {{ groupName }}</div>
                                        <span class="badge badge-warning" v-if="!user.groups.length"> User has no team yet ! </span>
                                    </div>
                                </div>
                            </div>
                        </p>
                    </div>
                    <div class="card-footer">
                        <a v-on:click="route(user._id)" class="btn btn-primary float-right"><i class="fas fa-user"></i></a>
                        <a v-on:click="openMessageModal(user._id)" class="btn btn-secondary float-right"><i class="far fa-envelope"></i></a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;
/* PERSONNAL COMPONENTS */
import Filters from "@/components/Filters.vue";
import Message from "@/components/Message.vue";
export default {
    name: "Users",
    methods: {
        replaceByDefault(e) {
            // Doesnt seem to work any more
            e.target.src = "defaut.png";
        },
        route: function (_id) {
            this.$router.push("/user/" + _id);
        },
        readUsers: function () {
            axios
                .post("readUsers", {
                    filters: this.filters,
                })
                .then((response) => {
                    this.users = response.data;
                    this.loaded = true;
                    //console.log(this.users);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        openFilters: function () {
            this.$modal.show("filters");
        },
        executeFilters: function (filtersChanged) {
            // filtersChanged is coming from the filters component, when a user has chosen some filters
            this.filters = filtersChanged;
            this.readUsers();
        },
        openMessageModal: function () {
            this.$modal.show("messageModal");
        }
    },
    components: {
        filters: Filters,
        message: Message
    },
    created: function () {
        this.readUsers();
    },
    data() {
        return {
            users: [],
            filters: {},
            jobs: [],
            loaded: false,
        };
    },
};
</script>

<style scoped>
.header {
    position: fixed;
    /* fixing the position takes it out of html flow - knows
                    nothing about where to locate itself except by browser
                    coordinates */
    left: 0;
    /* top left corner should start at leftmost spot */
    top: 50px;
    /* top left corner should start at topmost spot */
    width: 100vw;
    /* take up the full browser width */
    z-index: 200;
    /* high z index so other content scrolls underneath */
    height: 20vh;
    /* define height for content */
    padding: 15px;
    margin-left: 30px;
}

.tab-content {
    max-height: 10px !important;
}

.card-body {
    padding: 1px !important;
    max-height: 160px !important;
}

.tab-pane {
    background-color: wheat;
    min-height: 50px;
    height: 80px;
    overflow: auto;
    font-size: 0.9em;
}

.tab-content {
    min-height: 60px !important;
}

.cardList {
    margin-bottom: 20px;
    /*     min-width: 20rem;
    max-width:40vh !important; */
}

/* 
.row > div[class*='col-'] {
  display: flex;
  flex:1 0 auto;
} */
.filesList {
    width: 100% !important;
    max-width: 100% !important;
    max-height: 100px;
    overflow: auto;
}

h6 {
    color: #0068d9;
}

.card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0.8;
    transition: opacity 0.8s ease-in-out;
}
</style>
