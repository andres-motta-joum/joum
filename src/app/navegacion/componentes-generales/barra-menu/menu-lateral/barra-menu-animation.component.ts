import { trigger, state, style } from '@angular/animations';

export const AnimationMenu = [
    trigger('menu4', [
        state('active', style({
            left: '0px',
        })),
        state('inactive', style({
            left: '-250px',
        }))
    ]),
    trigger('submenu', [
        state('active', style({
            position: 'fixed',
            top: '0',
            left: '0'
        })),
        state('inactive', style({
            left: '-350px',
        }))
    ]),
    trigger('submenuULprincipal', [
        state('active', style({
            overflowY: 'hidden'
        })),
        state('inactive', style({
            overflowY: 'auto'
        }))
    ]),
    trigger('menu4-gray', [
        state('active', style({
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
        })),
        state('inactive', style({
            width: '0%',
            backgroundColor: 'rgba(0,0,0,0.0)',
        }))
    ])
];
