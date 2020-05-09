<template>
  <div class="home">
    <h2>First-follow</h2>
    <form class="form-wrapper">
      <div class="form-group" v-bind:key="rule.id" v-for="rule in rules">
        <el-input class="input-mini" placeholder="S" v-model="rule.left"></el-input>
        <span class="arrow">-></span>
        <el-input class="default-input" placeholder="a b A" v-model="rule.right"></el-input>
      </div>
      <div class="form-group text-center">
        <el-button class="add-rule" icon="el-icon-plus" type="success" @click="addRule">Добавить</el-button>
        <el-button icon="el-icon-s-promotion" type="primary" @click="calculate">Посчитать</el-button>
      </div>
    </form>
    <div class="first-sets">
      <el-table
              :data="firstData"
              border
              style="width: 100%">
        <el-table-column
                prop="left"
                label="#"
                width="80">
        </el-table-column>
        <el-table-column
                label="First sets">
          <template slot-scope="props">
            <span class="sets-item" v-bind:key="item" v-for="item in props.row.right">{{item === null ? 'eps' : item}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="follow-sets">
      <el-table
              :data="followData"
              border
              style="width: 100%">
        <el-table-column
                prop="left"
                label="#"
                width="80">
        </el-table-column>
        <el-table-column
                label="Follow sets">
          <template slot-scope="props">
            <span class="sets-item" v-bind:key="item" v-for="item in props.row.right">{{item === null ? 'eps' : item}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  const firstFollow = require('first-follow');

  export default {
    name: 'home',
    data() {
      return {
        rules: [
          {
            id: Math.random(),
            left: 'S',
            right: 'a b A'
          },
          {
            id: Math.random(),
            left: 'A',
            right: 'b c'
          },
          {
            id: Math.random(),
            left: 'A',
            right: 'eps'
          }
        ],
        firstData: [],
        followData: []
      }
    },
    mounted() {
      /* eslint-disable no-unused-vars */
    },
    methods: {
      addRule: function () {
        this.rules.push({
          id: Math.random(),
          left: '',
          right: ''
        })
      },
      calculate: function () {
        this.firstData = [];
        this.followData = [];

        let rules = [];
        for(let i = 0; i < this.rules.length; ++i){
          let right = this.rules[i].right.split(' ');///\s*/
          for(let i = 0; i < right.length; ++i){
            if(right[i] === 'eps')
              right[i] = null;
          }
          rules.push({
            left: this.rules[i].left,
            right: right
          });
        }

        const { firstSets, followSets } = firstFollow(rules);

        for(let item in firstSets){
          this.firstData.push({
            left: item,
            right: firstSets[item]
          })
        }

        for(let item in followSets){
          if(followSets[item].length === 1 && followSets[item][0] === '\u0000'){
            this.followData.push({
              left: item,
              right: ['-']
            });
          } else {
            this.followData.push({
              left: item,
              right: followSets[item]
            });
          }
        }
      }
    }
  }
</script>


<style scoped>
  .form-wrapper{
    max-width: 800px;
    margin: 0 auto;
  }
  .first-sets{
    max-width: 800px;
    margin: 10px auto;
  }
  .follow-sets{
    max-width: 800px;
    margin: 10px auto;
  }
  .form-group{
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
  }
  .default-input{

  }
  .input-mini{
    max-width: 80px;
  }
  .arrow{
    width: 20px;
    padding-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .add-rule{
    width: 180px;
  }
  .text-center{
    justify-content: center;
  }
  .sets-item{
    margin-right: 5px;
  }
</style>
