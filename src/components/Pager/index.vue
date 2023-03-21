<template>
  <div class="pagination">
    <!-- 如果页码数是1，就让这个背景变灰，并且阻止点击跳转 -->
    <button :class="{ activeButton: isActiveFirst }" @click="changePage(pageNo - 1)">上一页</button>

    <!-- 根据总的页码数和当前的页数显示不同的按钮 -->
    <button v-for="(item, index) of startAndEnd" :key="index" :class="{ activeBgc: item === pageNo }" @click="changePage(item)">{{ item }}</button>

    <!-- 如果页码数是最后一页，就让这个背景变灰，并且阻止点击跳转 -->
    <button :class="{ activeButton: isActiveLast }" @click="changePage(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ totalPage }} 页</button>

    <!-- 跳转到指定页面 -->
    <button>跳转</button>到<input type="text" />页

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'MyPager',
  props: ['total', 'pageSize', 'pageNo', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    isActiveFirst() {
      return this.pageNo === 1
    },
    isActiveLast() {
      return this.pageNo === this.totalPage
    },
    // 根据当前的页码数，总的页码数，算出需要在两个...之间显示的五个数字
    startAndEnd() {
      // 1. 如果当前的页数大于第三个并且小于倒数第三个，就需要计算出这个页码左右两边的两个数字保存在一个数组里面循环显示出来
      // 2. 如果是前三个页面，那么需要显示的就是前五个和省略号
      // 3. 如果当前的页码已经到了倒数第三个以及后面的页面，那么需要显示的就是倒数的五个数字以及前面的省略号
      // 4. 如果总页码数小于等于5个，那就显示1-5的所有数字，没有省略号
      let arr = []
      const { totalPage, pageNo, continues } = this
      const delta = parseInt(continues / 2)

      // 如果总的页数小于continues + 2页
      if (totalPage <= continues + delta) {
        for (let i = 1; i <= totalPage; i++) {
          arr.push(i)
        }
        return arr
      }

      // 如果当前页在continues以内
      if (pageNo <= continues) {
        for (let i = 1; i <= continues + delta; i++) {
          arr.push(i)
        }
        return arr
      }

      // 如果当前页在倒数的continues以内
      if (pageNo >= totalPage - continues) {
        arr.push('...')
        for (let i = totalPage - (continues + delta); i <= totalPage; i++) {
          arr.push(i)
        }
        return arr
      }

      for (let i = 1; i <= delta; i++) {
        arr.push(i)
      }
      arr.push('...')
      for (let i = pageNo - delta; i <= pageNo + delta; i++) {
        arr.push(i)
      }
      arr.push('...')
      return arr
    }
  },
  methods: {
    changePage(page) {
      // 页数超出范围不跳转
      if (page <= 0 || page > this.totalPage) {
        return
      }
      // 如果当前页就是指定页也不跳转
      if (page === this.pageNo) {
        return
      }
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .activeButton {
    background-color: rgb(255, 255, 255);
    color: #c1c1c6;
  }
  .activeBgc {
    background-color: skyblue;
  }
}
</style>
