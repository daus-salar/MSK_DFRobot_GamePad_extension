// tests go here; this will not be compiled when this package is used as an extension.
MSK_DFRobot_GamePad_NS.initialize_GamePad(1)

for (let i = 0; i<1000; i++)
{
    MSK_DFRobot_GamePad_NS.poll_buttons_A_B(200)

    MSK_DFRobot_GamePad_NS.poll_joystick(200)

    basic.pause(100)
}