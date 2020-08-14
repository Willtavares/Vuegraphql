<template>
  <b-container class="md-5 lg-5">
    <H1>Star Wars</H1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Birth Year</th>
          <th scope="col">Eye Color</th>
          <th scope="col">Gender</th>
          <th scope="col">Height</th>
          <th scope="col">Function</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="people in information" :key="people.name">
          <th scope="row">{{people.id}}</th>
          <td>{{people.name}}</td>
          <td>{{people.birthYear}}</td>
          <td>{{people.eyeColor[0]}}</td>
          <td>{{people.gender}}</td>
          <td>{{people.height}}</td>
          <td>
            <button type="button" class="btn btn-primary" @click="apagar(people.id)">Apagar</button>
          </td>
        </tr>
      </tbody>
    </table>
<br><br>
<hr>

    <div>
      <h2>Personagens com nome e Cor dos Olhos</h2>
    </div>

    <Personagem
      v-for="detalhe in information"
      :key="detalhe.id"
      :detailName="detalhe.name"
      :detailEyes="detalhe.eyeColor[0]"
    />

<br><br>
<hr>

    <div>
      <h2>Menu Dropdown com os nomes</h2>
      <b-dropdown id="dropdown-left" text="Nomes" variant="primary" class="m-2">
        <b-dropdown-item href="#" v-for="people in information" :key="people.name">{{people.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
  </b-container>
</template>

<script>
import Personagem from "./Personagem";

import { gql } from "apollo-boost";

const peoplesQuery = {
  query: gql`
    {
      allPersons(orderBy: name_ASC, first: 10) {
        id
        birthYear
        eyeColor
        gender
        height
        name
      }
    }
  `,
};

const peoplesDelete = gql`
  mutation UpdateTodo($id: ID!) {
    deletePerson(id: $id)
  }
`;

export default {
  name: "Home",
  components: {
    Personagem,
  },

  data() {
    return {
      information: [],
      itemDelete: "",
    };
  },

  async beforeMount() {
    try {
      const response = await this.$apollo.query(peoplesQuery);
      this.information = response.data.allPersons;
      console.log(this.information);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async apagar(removerId) {
      try {
        this.itemDelete = removerId;
        await this.$apollo.mutate({
          mutation: peoplesDelete.deletePerson,
          variables: {
            id: removerId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
