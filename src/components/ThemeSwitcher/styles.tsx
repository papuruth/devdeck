import styled from "styled-components";

export const SwitcherContainer = styled.div`
    display: flex;
    gap: 12px;
    padding: 6px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 18px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.5);
    }
`;

export const ModeButton = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: ${(props) => (props.$active ? "#22cc99" : "rgba(255, 255, 255, 0.6)")};
    background: ${(props) => (props.$active ? "rgba(34, 204, 153, 0.15)" : "transparent")};
    transition: all 0.2s ease;
    position: relative;

    &:hover {
        color: ${(props) => (props.$active ? "#22cc99" : "rgba(255, 255, 255, 0.9)")};
        background: ${(props) => (props.$active ? "rgba(34, 204, 153, 0.2)" : "rgba(255, 255, 255, 0.05)")};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        filter: drop-shadow(${(props) => (props.$active ? "0 0 8px rgba(34, 204, 153, 0.4)" : "none")});
    }
`;
