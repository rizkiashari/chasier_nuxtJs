<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="primary" dark>Register</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="fullname"
              label="Fullname"
              type="text"
              v-model="form.fullname"
              :rules="rules.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="form.email"
              :rules="rules.email"
              @keyup="checkEmail"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              v-model="form.password"
              :rules="rules.password"
            />
            <v-text-field
              name="retype_password"
              label="Re-Password"
              type="password"
              v-model="form.retype_password"
              :rules="rules.retype_password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit" color="primary">Register</v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Kamu belum punya akun?
        <v-btn plain class="pl-0" to="/login">login</v-btn>
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      emailExist: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullname: [(v) => !!v || 'Fullname is required'],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email is invalid',
          (v) => !!this.emailExist || 'Email is already exist',
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 6 || 'Password must be at least 6 characters',
        ],
        retype_password: [
          (v) => v === this.form.password || 'Password not match',
        ],
      },
    }
  },
  methods: {
    checkEmail() {
      this.$axios
        .post('http://localhost:3000/auth/check-email', this.form)
        .then((response) => {
          console.log(response)
          this.emailExist = false
        })
        .catch((err) => {
          this.emailExist = true
          console.log('error: ', err.message)
        })
    },
    onSubmit() {
      this.$axios
        .post('http://localhost:3000/auth/register', this.form)
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log('error: ', err.message)
        })
    },
  },
}
</script>
