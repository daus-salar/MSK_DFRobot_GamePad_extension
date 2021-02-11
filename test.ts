// tests go here; this will not be compiled when this package is used as an extension.
DFRobotGamePad.initialize_GamePad(1)

for (let i = 0; i<1000; i++)
{
    DFRobotGamePad.poll_buttons_A_B(200)

    DFRobotGamePad.poll_joystick(200)

    DFRobotGamePad.poll_microbit_logo_button(200)

    basic.pause(100)
}