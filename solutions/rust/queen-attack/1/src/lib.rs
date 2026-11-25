#[derive(Debug, PartialEq, Eq)]
pub struct ChessPosition {
    rank: i32,
    file: i32,
}

#[derive(Debug, PartialEq, Eq)]
pub struct Queen {
    position: ChessPosition,
}

impl ChessPosition {
    pub fn new(rank: i32, file: i32) -> Option<Self> {
        // Validar que las coordenadas estén en el rango de un tablero de 8x8 (0 a 7)
        if (0..8).contains(&rank) && (0..8).contains(&file) {
            Some(ChessPosition { rank, file })
        } else {
            None
        }
    }
}

impl Queen {
    pub fn new(position: ChessPosition) -> Self {
        Queen { position }
    }

    pub fn can_attack(&self, other: &Queen) -> bool {
        let r1 = self.position.rank;
        let c1 = self.position.file;
        let r2 = other.position.rank;
        let c2 = other.position.file;

        // Misma fila
        r1 == r2 
        // Misma columna
        || c1 == c2 
        // Misma diagonal (la diferencia absoluta en filas es igual a la diferencia absoluta en columnas)
        || (r1 - r2).abs() == (c1 - c2).abs()
    }
}