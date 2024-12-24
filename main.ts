namespace DFRobotGamePad
{
    /**
    * Initialize the DFRobot GamePad driver extension.
    * Include the Microbit Bluetooth Radio Group integer number
    */
    //% BlockID=msk_dfrobot_gamepad_initialize
    //% block="Initialize GamePad $radioGroup"
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

    /**
     * Checks to see if the vibramotor is on 
     */
    //% BlockID=msk_dfrobot_gamepad_is_vibramotor_on
    //% block="GamePad is vibramotor on?"
    export function is_vibramotor_on()
    {
        let state;
        state = pins.digitalReadPin(DigitalPin.P12)
        return (state == 1)
    }
    
    /**
     * Checks to see if the Red button is pressed 
     */
    //% BlockID=msk_dfrobot_gamepad_is_button_pressed_red
    //% block="GamePad ist Roter Knopf gedrückt?"
    export function is_button_red_pressed()
    {
        let state;
        state = pins.digitalReadPin(DigitalPin.P15)
        return (state == 0)
    }

    /**
     * Checks to see if the Blue button is pressed 
     */
    //% BlockID=msk_dfrobot_gamepad_is_button_pressed_blue
    //% block="GamePad ist Blauer Knopf gedrückt?"
    export function is_button_blue_pressed()
    {
        let state;
        state = pins.digitalReadPin(DigitalPin.P16)
        return (state == 0)
    }

    /**
     * Checks to see if the Green button is pressed 
     */
    //% BlockID=msk_dfrobot_gamepad_is_button_pressed_blue
    //% block="GamePad ist Grüner Knopf gedrückt?"
    export function is_button_green_pressed()
    {
        let state;
        state = pins.digitalReadPin(DigitalPin.P13)
        return (state == 0)
    }

    /**
     * Checks to see if the Yellow button is pressed 
     */
    //% BlockID=msk_dfrobot_gamepad_is_button_pressed_yellow
    //% block="GamePad ist Gelber Knopf gedrückt?"
    export function is_button_yellow_pressed()
    {
        let state;
        state = pins.digitalReadPin(DigitalPin.P14)
        return (state == 0)
    }

    /**
     * Turns on the vibramotor on 
     */
    //% BlockID=msk_dfrobot_gamepad_set_vibramotor_on
    //% block="Schalte Vibration an"
    export function set_vibramotor_on()
    { 
        // Turn on vibramotor 
        pins.digitalWritePin(DigitalPin.P12, 1)
    }

     /**
     * Turns on the vibramotor off 
     */
    //% BlockID=msk_dfrobot_gamepad_set_vibramotor_off
    //% block="Schalte Vibration aus"
    export function set_vibramotor_off()
    { 
        // Turn on vibramotor 
        pins.digitalWritePin(DigitalPin.P12, 0)
    }

    /**
    * Polls the status of the Micro:bit logo button to see if it has been pressed
    */
    //% BlockID=msk_dfrobot_gamepad_poll_logo
    //% block="Frage GamePad Knopf Logo ab $button_press_delay_msec"
    export function poll_microbit_logo_button (button_press_delay_msec: number)
    {
        if (input.logoIsPressed()) {
            game_pad_output = "LOGO"
            radio.sendString(game_pad_output)
            serial.writeLine(game_pad_output)
            basic.showLeds(`
                # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
                `)
            basic.pause(button_press_delay_msec)
            basic.clearScreen()
        }
    }

    /**
    * Polls the status of the buttons A and B to see if either or both have been pressed
    */
    //% BlockID=msk_dfrobot_gamepad_pollAB
    //% block="Frage GamePad Knöpfe AB ab $button_press_delay_msec"
    export function poll_buttons_A_B (button_press_delay_msec: number)
    {
        if (input.buttonIsPressed(Button.AB)) {
            game_pad_output = "AB"
            radio.sendString(game_pad_output)
            serial.writeLine(game_pad_output)
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            // Turn on vibramotor 
            pins.digitalWritePin(DigitalPin.P12, 1)
            // Turn on buzzer
            pins.setAudioPin(AnalogPin.P0)
            basic.pause(button_press_delay_msec)
        } else if (input.buttonIsPressed(Button.A)) {
            game_pad_output = "A"
            radio.sendString(game_pad_output)
            serial.writeLine(game_pad_output)
            basic.showLeds(`
                . # # . .
                # . . # .
                # # # # .
                # . . # .
                # . . # #
                `)
            basic.pause(button_press_delay_msec)
        } else if (input.buttonIsPressed(Button.B)) {
            game_pad_output = "B"
            radio.sendString(game_pad_output)
            serial.writeLine(game_pad_output)
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
    /**
    * Polls the status of the buttons joystick to see if the X or Y have been actuated or the Z button pressed
    */
    //% BlockID=msk_dfrobot_gamepad_pollJoyStick
    //% block="Frage GamePad Joystick ab $button_press_delay_msec"
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
    //% BlockID=msk_dfrobot_gamepad_pollcoloredbuttons
    //% block="Frage GamePad Farb Knöpfe ab $button_press_delay_msec"
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