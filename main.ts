namespace MSK_DFRobot_GamePad_NS
{
    /*
    * Initialize the DFRobot GamePad driver extension.
    * Include the Microbit Bluetooth Radio Group integer number
    */
    //% BlockID = msk_dfrobot_gamepad_initialize
    //% block = "Initialize DFRobot GamePad for $radioGroup number"
    export function initialize_GamePad (radioGroup: number)
    {
        radio.setGroup(radioGroup)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    }

    /*
    * Polls the status of the buttons A and B to see if either or both have been pressed
    */
    //% BlockID = msk_dfrobot_gamepad_pollAB
    //% block = "Poll DFRobot GamePad buttons A and B.  $button_press_delay is delay (msec) after button press"
    export function poll_buttons_A_B (button_press_delay_msec: number)
    {
        if (input.buttonIsPressed(Button.AB)) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.setAudioPin(AnalogPin.P0)
        } else if (input.buttonIsPressed(Button.A)) {
            game_pad_output = "A"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                . # # . .
                # . . # .
                # # # # .
                # . . # .
                # . . # #
                `)
        } else if (input.buttonIsPressed(Button.B)) {
            game_pad_output = "B"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                # # # . .
                # . . # .
                # # # . .
                # . . # .
                # # # . #
                `)
            basic.pause(button_press_delay_msec)
        } else {
            
        }
        basic.clearScreen()
    }
    /*
    * Polls the status of the buttons joystick to see if the X or Y have been actuated or the Z button pressed
    */
    //% BlockID = msk_dfrobot_gamepad_pollJoyStick
    //% block = "Poll DFRobot GamePad joystick"
    export function poll_joystick (button_press_delay_msec: number)
    {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            game_pad_output = "X"
            serial.writeLine(game_pad_output)
            radio.sendString(game_pad_output)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            basic.pause(button_press_delay_msec)
        } else if (pins.analogReadPin(AnalogPin.P2) > 550 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            game_pad_output = "FW" + convertToText(pins.analogReadPin(AnalogPin.P2))
            serial.writeLine(game_pad_output)
            radio.sendString(game_pad_output)
            basic.pause(button_press_delay_msec)
        } else if (pins.analogReadPin(AnalogPin.P2) < 450 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
            game_pad_output = "RV" + convertToText(pins.analogReadPin(AnalogPin.P2))
            serial.writeLine(game_pad_output)
            radio.sendString(game_pad_output)
        } else if (pins.analogReadPin(AnalogPin.P1) > 550 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
            game_pad_output = "RT" + convertToText(pins.analogReadPin(AnalogPin.P1))
            serial.writeLine(game_pad_output)
            radio.sendString(game_pad_output)
        } else if (pins.analogReadPin(AnalogPin.P1) < 450 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
            game_pad_output = "LT" + convertToText(pins.analogReadPin(AnalogPin.P1))
            serial.writeLine(game_pad_output)
            radio.sendString(game_pad_output)
        } else {
            basic.pause(20)
            radio.sendString("S")
        }
    }
    
    /*
    * Polls the status of the colored buttons 
    */
    //% BlockID = msk_dfrobot_gamepad_pollcoloredbuttons
    //% block = "Poll DFRobot GamePad Color Buttons"
    export function gamepad_poll_color_buttons (button_press_delay_msec: number) {
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            game_pad_output = "RED"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                # # # . .
                # . . # .
                # # # . .
                # . . # .
                # . . # .
                `)
        } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            game_pad_output = "GREEN"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                . # # . .
                # . . . .
                # . # # .
                # . . # .
                . # # . .
                `)
            basic.pause(button_press_delay_msec)
        } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
            game_pad_output = "BLUE"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                # # # . .
                # . . # .
                # # # . .
                # . . # .
                # # # . .
                `)
            basic.pause(button_press_delay_msec)
        } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
            game_pad_output = "YELLOW"
            radio.sendString(game_pad_output)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . . # . .
                . . # . .
                `)
            basic.pause(button_press_delay_msec)
        }
        basic.clearScreen()
    }
    
    /*
    // Output string from GamePad functions
    */
    let game_pad_output = ""
    
    //initialize_GamePad(1)

    /*
    // Delay after actuating any GamePad buttons or the joysick
    */
    let button_delay_msec = 1000
    //basic.forever(function ()
    //{
      //  gamepad_poll_color_buttons(button_delay_msec)
      //  poll_buttons_A_B(button_delay_msec)
      //  poll_joystick(button_delay_msec)
    //}) 

}