<template>
    <div>
        <div>
            <span v-if="!loaded"><img src="../assets/img/Spin-1s-200px.gif" class="loader"/></span>
        </div>
        <div class="container-fluid user-template" id="userDiv" v-show="loaded">
            <form method="post">
                <div class="row">
                    <div class="col-md-2">
                        <div class="profile-img">
                            <img v-bind:src="user.img" @error="replaceByDefault" style="width:150px" />
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="profile-head">
                            <h5>{{ user.prenom }} {{ user.nom.toUpperCase() }}</h5>
                            <h6>
                                {{ user.mentra }}
                            </h6>
                            <!-- <p class="proile-rating"></p> -->
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"
                                        ><i class="fas fa-home"></i><span class="d-none d-sm-block "> {{ t("ABOUT") }}</span></a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#social-network" role="tab"
                                        ><i class="fas fa-comments"></i> <span class="d-none d-sm-block ">{{ t("SOCIAL_NETWORK") }}</span></a
                                    >
                                </li>
                                <!--   <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fas fa-info"></i> <span class="d-none d-sm-block ">Dernières infos</span></a>
                            </li> -->
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#files" role="tab"
                                        ><i class="fas fa-file-alt"></i> <span class="d-none d-sm-block ">{{ t("FILES") }}</span></a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#authorizations" role="tab"
                                        ><i class="fas fa-lock"></i> <span class="d-none d-sm-block ">{{ t("PERMISSIONS") }}</span></a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row">
                    <div class="col-md-2 d-none d-md-block">
                        <div class="profile-work">
                            <p>{{ t("JOB_LINKS") }}</p>
                            <a href="">Website</a><br />
                            <a href="">Bootsnipp</a><br />
                            <a href="">Bootply</a>
                            <p>{{ t("SKILLS") }}</p>
                            <a href="">Web Designer</a><br />
                            <a href="">Web Developer</a><br />
                            <a href="">WordPress</a><br />
                            <a href="">WooCommerce</a><br />
                            <a href="">PHP, .Net</a><br />
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>User Id </label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>
                                            <input v-model="user._id" class="form-control" :placeholder="t('PARAMETER_ME')" disabled />
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>{{ t("LAST_NAME") }}</label>
                                    </div>
                                    <div class="col-md-6" :class="{ 'form-group--error': $v.user.nom.$error }">
                                        <p>
                                            <input
                                                :disabled="true"
                                                v-model="user.nom"
                                                class="form-control"
                                                v-on:input="$v.user.nom.$touch"
                                                :placeholder="t('PARAMETER_ME')"
                                                v-bind:class="{ 'is-invalid': $v.user.nom.$error, 'is-valid': $v.user.nom.$dirty && !$v.user.nom.$invalid }"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>{{ t("FIRST_NAME") }}</label>
                                    </div>
                                    <div class="col-md-6" :class="{ 'form-group--error': $v.user.prenom.$error }">
                                        <p>
                                            <input
                                                :disabled="true"
                                                v-model="user.prenom"
                                                class="form-control"
                                                :placeholder="t('PARAMETER_ME')"
                                                v-on:input="$v.user.prenom.$touch"
                                                v-bind:class="{
                                                    'is-invalid': $v.user.prenom.$error,
                                                    'is-valid': $v.user.prenom.$dirty && !$v.user.prenom.$invalid,
                                                }"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>{{ t("EMAIL") }}</label>
                                    </div>
                                    <div class="col-md-6" :class="{ 'form-group--error': $v.user.email.$error }">
                                        <p>
                                            <input
                                                :disabled="true"
                                                v-model="user.email"
                                                class="form-control"
                                                :placeholder="t('PARAMETER_ME')"
                                                v-on:input="$v.user.email.$touch"
                                                v-bind:class="{
                                                    'is-invalid': $v.user.email.$error,
                                                    'is-valid': $v.user.email.$dirty && !$v.user.email.$invalid,
                                                }"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>{{ t("PHONE") }}</label>
                                    </div>
                                    <div class="col-md-6" :class="{ 'form-group--error': $v.user.phone.$error }">
                                        <p>
                                            <input
                                                :disabled="true"
                                                v-model="user.phone"
                                                class="form-control"
                                                :placeholder="t('PARAMETER_ME')"
                                                v-on:input="$v.user.phone.$touch"
                                                v-bind:class="{
                                                    'is-invalid': $v.user.phone.$error,
                                                    'is-valid': $v.user.phone.$dirty && !$v.user.phone.$invalid,
                                                }"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>{{ t("JOB") }}</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>
                                            {{ user.job }}
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row ">
                                    <div class="col-md-2">
                                        <label>{{ t("LAST_NAME") }}</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Hourly Rate</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>10$/hr</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Total Projects</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>230</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>English Level</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label>Availability</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>6 months</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row">
                                    <div class="col-md-12 tab-content-user">
                                        <span class="badge badge-warning" v-if="!user.filenames.length"> {{ t("USER_HAS_NO_FILES") }}</span>
                                        <table v-if="user.filenames.length" class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>{{ t("NAME") }}</th>
                                                    <th>{{ t("FTP_DOWNLOAD") }}</th>
                                                </tr>
                                            </thead>
                                            <tr v-for="file in user.filenames">
                                                <td>
                                                    <a class="float-left"> <i class="fas fa-file-alt"></i> {{ file.filename }}</a>
                                                    <!-- When files are stored on the NODEJS SERVER , add v bind for the download link -->
                                                    <!-- <a class="float-left" v-bind:href="file.filename"> <i class="fas fa-file-alt"></i> {{ file.filename }}</a> -->
                                                </td>
                                                <td>
                                                    <span class="btn btn-warning" v-on:click="readFtpFile(file)">
                                                        <i class="far fa-file"></i>
                                                        <br />
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="authorizations" role="tabpanel" aria-labelledby="authorizations-tab">
                                  <permissionslist :user="this.user" ></permissionslist>
                            </div>
                            <div class="tab-pane fade" id="social-network" role="tabpanel" aria-labelledby="social-network-tab">
                                <div class="row">
                                    <socialnetwork :user="this.user"></socialnetwork>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <!--   <span><a class="btn btn-primary btn-block" v-on:click="openMessageModal()">
                            <i class="far fa-envelope"></i> <span class="d-none d-sm-block">Message</span></a>
                        <v-dialog /></span> -->
                    </div>
                </div>
            </form>
        </div>
        <modal name="messageModal" :width="350" :height="400">
            <message :user="this.anonymous"></message>
        </modal>
    </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import { SidebarMenu } from "vue-sidebar-menu";
import { required, minLength, between } from "vuelidate/lib/validators";
/* IMPORTING PERSONNAL COMPONENTS */
import Uploadpicture from "@/components/Uploadpicture.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import Message from "@/components/Message.vue";
import Socialnetwork from "@/components/SocialNetwork.vue";
import PermissionsList from "@/components/PermissionsList.vue";
export default {
    name: "User",
    props: ["_id"],
    beforeCreate: function() {},
    data() {
        return {
            user: {
                _id: "",
                nom: "",
                prenom: "",
                phone: "",
                email: "",
                password: "",
                img: "",
                filenames: [],
                socials_messages: [
                    {
                        test: "test",
                    },
                ],
            },
            anonymous: {
                _id: "anonymous",
                nom: "anonymous",
                prenom: "anonymous",
                phone: "",
                email: "",
                password: "",
                img: "",
                filenames: [],
            },
            auth: false,
            loaded: false,
        };
    },
    validations: {
        user: {
            nom: {
                required,
                minLength: minLength(2),
            },
            prenom: {
                required,
                minLength: minLength(2),
            },
            email: {
                required,
                minLength: minLength(2),
            },
            phone: {
                minLength: minLength(2),
                numeric: true,
            },
        },
    },
    components: {
        uploadpicture: Uploadpicture,
        uploadfiles: Uploadfiles,
        message: Message,
        socialnetwork: Socialnetwork,
         permissionslist:PermissionsList
    },
    methods: {
        readUser: function() {
            axios
                .get("readUser?_id=" + this._id)
                .then((response) => {
                    this.user = response.data;
                    this.loaded = true;
                    this.disableAllinputs();
                    if (!this.user.social_messages) {
                        this.user.social_messages = [];
                    }
                })
                .catch(function(erreur) {
                    console.log(erreur);
                });
        },
        readFtpFile(file) {
            let self = this;
            axios
                .post("readFtpFile", {
                    name: file.filename,
                })
                .then((response) => {
                    console.log("File had been transfered to the node server");
                    axios({
                        url: file.filename, //your url
                        method: "GET",
                        responseType: "blob", // important
                    }).then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", file.filename);
                        document.body.appendChild(link);
                        link.click();
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        type: "error",
                        group: "foo",
                        title: "Hey! ",
                        text: "Permission is missing ! -> <br> " + error,
                    });
                });
        },
        openMessageModal: function() {
            this.$modal.show("messageModal");
        },
        replaceByDefault(e) {
            e.target.src = "defaut.png";
        },
        disableAllinputs: function() {
            /*     let elems = document.getElementById('userDiv').getElementsByTagName('input');
                for (let i = 0; i < elems.length; i++) {
                    elems[i].disabled = true;
                } */
        },
    },
    mounted: function() {
        this.readUser();
    },
};
</script>

<style>
.badge-space {
    min-width: 150px;
}

.tab-content-user {
    padding: 10px;
    margin: 10px;
    margin-bottom: 50px;
}

.error {
    border-color: red;
    background: #fdd;
}

.error:focus {
    outline-color: #f99;
}

.valid {
    border-color: #5a5;
    background: #efe;
}

.valid:focus {
    outline-color: #8e8;
}

/* change all .btn to .btn-sm size on xs */
@include media-breakpoint-between(xs, sm) {
    .btn {
        @include button-size($input-btn-padding-y-sm, $input-btn-padding-x-sm, $font-size-sm, $line-height-sm, $btn-border-radius-sm);
    }
}

/* ---------------------------------------------------
 PROFILE
----------------------------------------------------- */
.emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}

.profile-img {
    text-align: center;
}

.profile-img img {
    width: 70%;
    height: 100%;
}

.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}

.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}

.profile-head h5 {
    color: #333;
}

.profile-head h6 {
    color: #0062cc;
}

.profile-edit-btn {
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}

.proile-rating {
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}

.proile-rating span {
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}

.profile-head .nav-tabs {
    margin-bottom: 5%;
}

.profile-head .nav-tabs .nav-link {
    font-weight: 600;
    border: none;
}

.profile-head .nav-tabs .nav-link.active {
    border: none;
    border-bottom: 2px solid #0062cc;
}

.profile-work {
    padding: 14%;
    margin-top: -15%;
}

.profile-work p {
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}

.profile-work a {
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}

.profile-work ul {
    list-style: none;
}

.profile-tab label {
    font-weight: 600;
}

.profile-tab p {
    font-weight: 600;
    color: #0062cc;
}

/* LIST USERS  */
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

/* TOPBAR */
.rounded-circle {
    border-radius: 50% !important;
}

.dropdown-list-image {
    position: relative;
    height: 2.5rem;
    width: 2.5rem;
}

.dropdown-list-image img {
    height: 2.5rem;
    width: 2.5rem;
}

.dropdown-list-image .status-indicator {
    background-color: #eaecf4;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 0.125rem solid #fff;
}

/* DAHSBOARD */
#wrapper {
    position: relative;
    padding-top: 20px;
    background: #000524;
    border: 1px solid #000;
    box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.71);
    max-width: 850px;
    margin: 35px auto;
}

/* 
HOME  */
.container {
    max-width: 960px;
}

.pricing-header {
    max-width: 700px;
}

.card-deck .card {
    min-width: 220px;
}

.border-top {
    border-top: 1px solid #e5e5e5;
}

.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>
