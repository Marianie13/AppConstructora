package com.constructora.controller;

import com.constructora.dto.ViviendaRequestDTO;
import com.constructora.dto.ViviendaResponseDTO;
import com.constructora.service.ViviendaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viviendas")
@RequiredArgsConstructor
public class ViviendaController {

    private final ViviendaService viviendaService;

    @GetMapping
    public ResponseEntity<List<ViviendaResponseDTO>> obtenerTodas() {
        return ResponseEntity.ok(viviendaService.obtenerTodas());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<ViviendaResponseDTO>> obtenerDisponibles() {
        return ResponseEntity.ok(viviendaService.obtenerDisponibles());
    }

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<ViviendaResponseDTO>> obtenerPorProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(viviendaService.obtenerPorProyecto(proyectoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViviendaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(viviendaService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<ViviendaResponseDTO> crear(@Valid @RequestBody ViviendaRequestDTO dto) {
        ViviendaResponseDTO creada = viviendaService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ViviendaResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ViviendaRequestDTO dto) {
        ViviendaResponseDTO actualizada = viviendaService.actualizar(id, dto);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        viviendaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
