import { trigger, state, style, animate, transition } from '@angular/animations';

export const AnimationMenu = [
    trigger('menu4', [
        state('active', style({
            left: '0px',
        })),
        state('inactive', style({
            left: '-250px',
        })),
        transition('active => inactive', [
            animate('.15s')
        ]),
        transition('inactive => active', [
            animate('.45s') // Aquí se define el tiempo de la animación
        ]),
    ]),
    trigger('submenu', [
        state('active', style({
            position: 'fixed',
            top: '0',
            left: '0'
        })),
        state('inactive', style({
            position: 'fixed',
            left: '-350px',
            top: '0',
        })),
        transition('active => inactive', [
            animate('.35s')
        ]),
        transition('inactive => active', [
            animate('.3s') // Aquí se define el tiempo de la animación
        ]),
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
