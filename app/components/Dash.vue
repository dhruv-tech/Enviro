<!--
  (i) Written by Dhruv, Data Dashboard.
-->

<!-- CSS -->
<style lang="scss" scoped src="./css/Dash.scss"></style>

<!-- XML -->
<template>
    <Page actionBarHidden="true">
      <ScrollView orientation="vertical">
        <StackLayout orientation="vertical" class="center-text">

          <Label :text="location.city" class="title"/>

          <StackLayout backgroundColor="#ffffff" id="title-card" class="span-85 card">
            <Label :text="location.msg" :class="'status '+location.prominentColorClass"/>
            <Label :text="location.station" class="location-area"/>
            <Label :text="'Prominent Pollutant: '+location.prominent" class="poll-main" />
          </StackLayout>

          <GridLayout rows="auto" columns="145" id="status-img-container">
            <Image :src="'~/components/imgs/'+location.msg+'.png'" stretch="aspectFit" id="status-img"/>
            <Label :text="location.aqi" class="aqi"/>
          </GridLayout>

          <Label text="For You" class="subtitle pull-up"/>
          <FlexboxLayout flexDirection="row" justifyContent="center" class="span-85 card circle-center">

            <StackLayout class="circle" backgroundColor="#ffffff"></StackLayout>
            <StackLayout class="spacer-x"></StackLayout>

            <StackLayout class="circle" backgroundColor="#ffffff"></StackLayout>
            <StackLayout class="spacer-x"></StackLayout>

            <StackLayout class="circle" backgroundColor="#ffffff">
              
            </StackLayout>
          </FlexboxLayout>

          <Label text="Trends" class="subtitle"/>
          <FlexboxLayout flexDirection="column" backgroundColor="#ffffff" class="span-85 card">
            
          </FlexboxLayout>

          <Label text="Air Composition" class="subtitle"/>
          <GridLayout rows="*, *, *" columns="*, *, *" backgroundColor="#ffffff" class="span-85 card" id="pollutants">
            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="0" col="0">
              <Label :text="location.data[0].pollutant_avg" :class="'value '+location.colorClasses[0]"/>
              <Label :text="location.data[0].pollutant_id" class="poll_name"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="0" col="1">
              <Label :text="location.data[1].pollutant_avg" :class="'value '+location.colorClasses[1]"/>
              <Label :text="location.data[1].pollutant_id" class="poll_name"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="0" col="2">
              <Label :text="location.data[2].pollutant_avg" :class="'value '+location.colorClasses[2]"/>
              <Label :text="location.data[2].pollutant_id" class="poll_name"/>
            </FlexboxLayout>

            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="1" col="0">
              <Label :text="location.data[3].pollutant_avg" :class="'value '+location.colorClasses[3]"/>
              <Label :text="location.data[3].pollutant_id" class="poll_name"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="1" col="1">
              <Label :text="location.data[4].pollutant_avg" :class="'value '+location.colorClasses[4]"/>
              <Label :text="location.data[4].pollutant_id" class="poll_name"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="1" col="2">
              <Label :text="location.data[5].pollutant_avg" :class="'value '+location.colorClasses[5]"/>
              <Label :text="location.data[5].pollutant_id" class="poll_name"/>
            </FlexboxLayout>

            <FlexboxLayout flexDirection="column" justifyContent="center" alignItems="center" row="2" col="0">
              <Label :text="location.data[6].pollutant_avg" :class="'value '+location.colorClasses[6]"/>
              <Label :text="location.data[6].pollutant_id" class="poll_name"/>
            </FlexboxLayout>
          
          </GridLayout>

          <FlexboxLayout justifyContent="center" id="footer-logo">
            <GridLayout rows="auto" columns="135">
              <Image src="~/components/imgs/logo-long.png" stretch="aspectFit"/>
            </GridLayout>
          </FlexboxLayout>
          <FlexboxLayout justifyContent="center" id="footer-text">
            <Label text="Version 1.0.0 / Android / English"/>
          </FlexboxLayout>

        </StackLayout>
      </ScrollView>
    </Page>
</template>

<!-- JS -->
<script src="./js/Dash.js"></script>