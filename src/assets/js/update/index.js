export const data = {
  updateUrl: '12333'
}

export const methods = {
  update () {
    let url = this.$$.appURL + '/version.json'
    // let url = 'https://whallet.net/version.json'
    // let url = '/api/version.json'
    try {
      this.$http.get(url).then(res => {
        let data = res.data
        console.log(data)
        if (data.version === this.$$.version) {
          this.latestVersionTip()
        } else {
          this.updateUrl = data.url
          this.versionTip(data)
        }
      }).catch(err => {
        console.log(err)
        this.latestVersionTip()
      })
    } catch (error) {
      console.log(error)
      this.latestVersionTip()
    }
  },
  versionTipMust(data) {
    this.$dialog.alert({
      title: this.$t('nav').update,
      message: this.$t('tip').newVersion + '：' + data.version + '<br>' + this.$t('tip').copyVersionUrl + '：' + data.url,
      confirmButtonText: this.$t('btn').copy
    }).then(() => {
      this.copyTxt('copyAddress')
      this.setTime()
    })
  },
  versionTipNoMust(data) {
    this.$dialog.confirm({
      title: this.$t('nav').update,
      message: this.$t('tip').newVersion + '：' + data.version + '<br>' + this.$t('tip').copyVersionUrl + '：' + data.url,
      confirmButtonText: this.$t('btn').copy
    }).then(() => {
      this.copyTxt('copyAddress')
      this.setTime()
    }).catch(err => {
      console.log(err)
      this.setTime()
    })
  },
  copyTxt (id) {
    document.getElementById(id).select()
    document.execCommand("Copy")
    this.$notify({ type: 'success', message: this.$t('success').s_3 })
  },
  setTime () {
    localStorage.setItem('versionTime', Date.now())
  }
}