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
            <Label :text="location.msg" class="status satisfactory" :id="color"/>
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
          <FlexboxLayout flexDirection="column" backgroundColor="#ffffff" class="span-85 card">
            
          </FlexboxLayout>

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